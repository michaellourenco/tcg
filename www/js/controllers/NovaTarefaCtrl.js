//'use strict';


angular


  .module('app.novatarefa', ['angularFileUpload'])

  .controller('NovaTarefaCtrl',  ['$scope', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location', function($scope, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location) {
   

  console.log($stateParams.namespace);
console.log($stateParams.id);

  namespace = $stateParams.namespace;
  id = $stateParams.id;

      carregarCombate = function (namespace){
        $http.get("combates/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
          console.log(data);
          $scope.combate = data; 
          $scope.mapaForca = data.mapaForcas[$stateParams.id];    
          console.log($scope.mapaForca.name);
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

      $scope.adicionarTarefa = function (tarefa){
        console.log($scope.combate.mapaForcas[$stateParams.id].tarefas != null);
        console.log($stateParams.id);
        if($scope.combate.mapaForcas[$stateParams.id].tarefas != null){
          $scope.combate.mapaForcas[$stateParams.id].tarefas.push(tarefa);
        }else{
          $scope.combate.mapaForcas[$stateParams.id].tarefas = [];
          $scope.combate.mapaForcas[$stateParams.id].tarefas.push(tarefa);
        };
        $http.post("editarcombate.php", $scope.combate).success(function (data) {
          /*delete $scope.combate;*/
          /*$scope.mapaForcaForm.$setPristine();*/
          $location.path("/app/combate/"+namespace);
          console.log($location.path());
        });


      };



        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(tarefa /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(tarefa /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', tarefa, filter, options);
        };
        uploader.onAfterAddingFile = function(fileTarefa) {
            console.info('onAfterAddingFile', fileTarefa);
        };
        uploader.onAfterAddingAll = function(addedFileTarefas) {
            console.info('onAfterAddingAll', addedFileTarefas);
        };
        uploader.onBeforeUploadTarefa = function(tarefa) {
            console.info('onBeforeUploadTarefa', tarefa);
        };
        uploader.onProgressTarefa = function(fileTarefa, progress) {
            console.info('onProgressTarefa', fileTarefa, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessTarefa = function(fileTarefa, response, status, headers) {
            console.info('onSuccessTarefa', fileTarefa, response, status, headers);
        };
        uploader.onErrorTarefa = function(fileTarefa, response, status, headers) {
            console.info('onErrorTarefa', fileTarefa, response, status, headers);
        };
        uploader.onCancelTarefa = function(fileTarefa, response, status, headers) {
            console.info('onCancelTarefa', fileTarefa, response, status, headers);
        };
        uploader.onCompleteTarefa = function(fileTarefa, response, status, headers) {
            console.info('onCompleteTarefa', fileTarefa, response, status, headers);
            console.info('onCompleteITem',fileTarefa.file.name);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


        // -------------------------------


        var controller = $scope.controller = {
            isImage: function(tarefa) {
                var type = '|' + tarefa.type.slice(tarefa.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
    }]);