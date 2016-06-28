//'use strict';


angular

    .module('app.combate', ['angularFileUpload'])

    .controller('CombateCtrl', ['$scope', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location','$log','$templateCache','combatesAPI','dadoAPI','mapaForcaAPI', function($scope, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location,$log,$templateCache,combatesAPI,dadoAPI,mapaForcaAPI) {
      $templateCache.removeAll();
     
      namespace = $stateParams.namespace;
      
      carregarCombate = function (namespace){
        combatesAPI.getCombates().success(function (data) {
          $scope.combate = data; 
          var mapaForcas = $scope.combate.mapaForcas; 
   
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
      };
      carregarCombate(namespace);
     carregarTarefa = function (){
        $http.get("tarefas/tarefas.json", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
          console.log(data);
          $scope.tarefas = data;   
          console.log($scope.tarefas);
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });

      };
carregarTarefa();
      $scope.editarCombate = function (combate,tarefa){
        if(tarefa!= null){
        
        }else{
            combatesAPI.saveCombate(combate).success(function (data) {
              $location.path("/app/combate/"+namespace);
          });
        }
      };

      $scope.adicionarTarefa = function (combate){
        combatesAPI.saveCombate($scope.combate).success(function (data) {
          delete $scope.combates;
          $scope.combateEdit.$setPristine();
          $location.path("#/app/combate/"+namespace);
        });
      };

      $scope.apagarTarefa = function (indiceTarefa,indiceMapaForca){
        $scope.combate != $scope.combate.mapaForcas[indiceMapaForca].itens.splice(indiceTarefa,1);      
        combatesAPI.saveCombate($scope.combate).success(function (data) {
          /*delete $scope.combate;*/
          $location.path("/app/combate/"+namespace);
        });
      };

      $scope.apagarMapaForca = function (indiceMapaForca){
        $scope.combate != $scope.combate.mapaForcas.splice(indiceMapaForca,1);      
        combatesAPI.saveCombate($scope.combate).success(function (data) {
          /*delete $scope.combate;*/
          $location.path("/app/combate/"+namespace);
        });
      };
  
      var uploader = $scope.uploader = new FileUploader({
          url: 'upload.php'
      });
      
      // FILTERS
      uploader.filters.push({
          name: 'customFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              return this.queue.length < 10;
          }
      });

      // CALLBACKS
      uploader.onAfterAddingFile = function(item) {
          var fileExtension = '.' + item.file.name.split('.').pop();

          item.file.name = Math.random().toString(36).substring(7) + new Date().getTime() + fileExtension;
        };

      uploader.onBeforeUploadItem = function(item) {
        $http.get("combates/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
          mudado = {logo:"2.jpg"};      
          item.formData.push(mudado);
          item.formData.push(data);
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
      };

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
          $http.get("combates/"+namespace+".phtml").success(function (data) {

          }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
          });
          
          fileItem.formData[1].logo = fileItem.file.name;

          informacao = fileItem.formData[1];
          $http.post("editarcombate.php", informacao).success(function (data) {
            /*delete $scope.cardapio;
            $scope.categoriaForm.$setPristine();*/
             $location.path("/app/combate/"+namespace);
          });
        };
      uploader.onCompleteAll = function() {
          //console.info('onCompleteAll');
      };

      //console.info('uploader', uploader);

        // -------------------------------

        var controller = $scope.controller = {
            isImage: function(item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
    }]);