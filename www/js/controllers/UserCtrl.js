//'use strict';


angular

    .module('app.user', ['angularFileUpload'])

    .controller('UserCtrl', ['$scope', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location','$log','$templateCache','usersAPI','dadoAPI','mapaForcaAPI', function($scope, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location,$log,$templateCache,usersAPI,dadoAPI,mapaForcaAPI) {
      $templateCache.removeAll();
     
      namespace = $stateParams.namespace;
      
      carregarUser = function (namespace){
        usersAPI.getUsers().success(function (data) {
          $scope.user = data; 
          var mapaForcas = $scope.user.mapaForcas; 
          per1 = mapaForcas[0];    
          per2 = mapaForcas[2];   

      })};
      carregarUser(namespace);

      $scope.editarUser = function (user,tarefa){
        if(tarefa!= null){
        
        }else{
            usersAPI.saveUser(user).success(function (data) {
              $location.path("/app/user/"+namespace);
          });
        }
      };

      $scope.adicionarTarefa = function (user){
        usersAPI.saveUser($scope.user).success(function (data) {
          delete $scope.users;
          $scope.userEdit.$setPristine();
          $location.path("#/app/user/"+namespace);
        });
      };

      $scope.apagarTarefa = function (indiceTarefa,indiceMapaForca){
        $scope.user != $scope.user.mapaForcas[indiceMapaForca].itens.splice(indiceTarefa,1);      
        usersAPI.saveUser($scope.user).success(function (data) {
          /*delete $scope.user;*/
          $location.path("/app/user/"+namespace);
        });
      };

      $scope.apagarMapaForca = function (indiceMapaForca){
        $scope.user != $scope.user.mapaForcas.splice(indiceMapaForca,1);      
        usersAPI.saveUser($scope.user).success(function (data) {
          /*delete $scope.user;*/
          $location.path("/app/user/"+namespace);
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
        $http.get("users/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
          mudado = {logo:"2.jpg"};      
          item.formData.push(mudado);
          item.formData.push(data);
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
      };

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
          $http.get("users/"+namespace+".phtml").success(function (data) {

          }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
          });
          
          fileItem.formData[1].logo = fileItem.file.name;

          informacao = fileItem.formData[1];
          $http.post("editaruser.php", informacao).success(function (data) {
            /*delete $scope.cardapio;
            $scope.categoriaForm.$setPristine();*/
             $location.path("/app/user/"+namespace);
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