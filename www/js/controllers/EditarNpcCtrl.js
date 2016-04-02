//'use strict';


angular


    .module('app.editarnpc', ['angularFileUpload'])


    .controller('EditarNpcCtrl', ['$scope', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location', function($scope, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location) {

    console.log($stateParams.namespace);
    console.log($stateParams.id);

    namespace = $stateParams.namespace;
    id = $stateParams.id;

      carregarCombate = function (namespace){
        $http.get("combates/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
          console.log(data);
          $scope.combate = data; 
                    $scope.npc = data.npcs[$stateParams.id];    
                console.log($scope.npc.name);
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });

      };

      carregarCombate(namespace); 

      $scope.editarNpc = function (npc){
        console.log($scope.combate.npcs[$stateParams.id] != null);
        console.log($stateParams.id);
        $scope.combate != $scope.combate.npcs.splice($stateParams.id,1,npc);      
        $http.post("editarcombate.php", $scope.combate).success(function (data) {
          /*delete $scope.combate;*/
          console.log("/app/npcs/"+namespace);
          $location.path("/app/npcs/"+namespace);
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
        $http.get("combates/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {  

        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });      
        console.info('response'+response);
        fileItem.formData[1].npcs[$stateParams.id].imagem = fileItem.file.name;
        informacao = fileItem.formData[1];
        $http.post("editarcombate.php", informacao).success(function (data) {
          /*delete $scope.cardapio;
          $scope.categoriaForm.$setPristine();*/
           $location.path("/app/npcs/"+namespace);
        });
      };

      uploader.onCompleteAll = function() {
          console.info('onCompleteAll');
      };

      console.info('uploader', uploader);

        // -------------------------------

        var controller = $scope.controller = {
            isImage: function(item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
    }]);