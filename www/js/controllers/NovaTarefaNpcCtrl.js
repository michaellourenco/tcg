//'use strict';


angular


  .module('app.novatarefanpc', ['angularFileUpload'])

  .controller('NovaTarefaNpcCtrl',  ['$scope', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location', function($scope, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location) {
   

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


      $scope.adicionarTarefaNpc = function (tarefanpc){
        console.log($scope.combate.npcs[$stateParams.id].tarefanpcs != null);
        console.log($stateParams.id);
        if($scope.combate.npcs[$stateParams.id].tarefanpcs != null){
          $scope.combate.npcs[$stateParams.id].tarefanpcs.push(tarefanpc);
        }else{
          $scope.combate.npcs[$stateParams.id].tarefanpcs = [];
          $scope.combate.npcs[$stateParams.id].tarefanpcs.push(tarefanpc);
        };
        $http.post("editarcombate.php", $scope.combate).success(function (data) {
          /*delete $scope.combate;*/
          /*$scope.npcForm.$setPristine();*/
          $location.path("/app/npcs/"+namespace);
          console.log($location.path());
        });


      };


      $scope.novoNpc = function (npc){
        $scope.combate.npcs.push(npc);
        $http.post("editarcombate.php", $scope.combate).success(function (data) {
          /*delete $scope.combate;
          $scope.npcForm.$setPristine();*/
                    $location.path("#/app/combates");
        });
      };

      carregarCombate(namespace);
      $scope.adicionarCombate = function (combate) {
        console.log("antes:"+combate);

        $http.post("novocombate.php", combate).success(function (data) {
          console.log("depois:"+combate);
         /* delete $scope.combates;
          $scope.combateForm.$setPristine();*/
          $location.path("#/app/combates");
        });
      };

        var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(tarefanpc /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(tarefanpc /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', tarefanpc, filter, options);
        };
        uploader.onAfterAddingFile = function(fileTarefaNpc) {
            console.info('onAfterAddingFile', fileTarefaNpc);
        };
        uploader.onAfterAddingAll = function(addedFileTarefaNpcs) {
            console.info('onAfterAddingAll', addedFileTarefaNpcs);
        };
        uploader.onBeforeUploadTarefaNpc = function(tarefanpc) {
            console.info('onBeforeUploadTarefaNpc', tarefanpc);
        };
        uploader.onProgressTarefaNpc = function(fileTarefaNpc, progress) {
            console.info('onProgressTarefaNpc', fileTarefaNpc, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessTarefaNpc = function(fileTarefaNpc, response, status, headers) {
            console.info('onSuccessTarefaNpc', fileTarefaNpc, response, status, headers);
        };
        uploader.onErrorTarefaNpc = function(fileTarefaNpc, response, status, headers) {
            console.info('onErrorTarefaNpc', fileTarefaNpc, response, status, headers);
        };
        uploader.onCancelTarefaNpc = function(fileTarefaNpc, response, status, headers) {
            console.info('onCancelTarefaNpc', fileTarefaNpc, response, status, headers);
        };
        uploader.onCompleteTarefaNpc = function(fileTarefaNpc, response, status, headers) {
            console.info('onCompleteTarefaNpc', fileTarefaNpc, response, status, headers);
            console.info('onCompleteITem',fileTarefaNpc.file.name);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


        // -------------------------------


        var controller = $scope.controller = {
            isImage: function(tarefanpc) {
                var type = '|' + tarefanpc.type.slice(tarefanpc.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
    }]);