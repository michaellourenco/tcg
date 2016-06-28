//'use strict';


angular


  .module('app.novatalaonpc', ['angularFileUpload'])

  .controller('NovaTalaoNpcCtrl',  ['$scope', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location', function($scope, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location) {
   

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


      $scope.adicionarTalaoNpc = function (talaonpc){
        console.log($scope.combate.npcs[$stateParams.id].talaonpcs != null);
        console.log($stateParams.id);
        if($scope.combate.npcs[$stateParams.id].talaonpcs != null){
          $scope.combate.npcs[$stateParams.id].talaonpcs.push(talaonpc);
        }else{
          $scope.combate.npcs[$stateParams.id].talaonpcs = [];
          $scope.combate.npcs[$stateParams.id].talaonpcs.push(talaonpc);
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
            fn: function(talaonpc /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(talaonpc /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', talaonpc, filter, options);
        };
        uploader.onAfterAddingFile = function(fileTalaoNpc) {
            console.info('onAfterAddingFile', fileTalaoNpc);
        };
        uploader.onAfterAddingAll = function(addedFileTalaoNpcs) {
            console.info('onAfterAddingAll', addedFileTalaoNpcs);
        };
        uploader.onBeforeUploadTalaoNpc = function(talaonpc) {
            console.info('onBeforeUploadTalaoNpc', talaonpc);
        };
        uploader.onProgressTalaoNpc = function(fileTalaoNpc, progress) {
            console.info('onProgressTalaoNpc', fileTalaoNpc, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessTalaoNpc = function(fileTalaoNpc, response, status, headers) {
            console.info('onSuccessTalaoNpc', fileTalaoNpc, response, status, headers);
        };
        uploader.onErrorTalaoNpc = function(fileTalaoNpc, response, status, headers) {
            console.info('onErrorTalaoNpc', fileTalaoNpc, response, status, headers);
        };
        uploader.onCancelTalaoNpc = function(fileTalaoNpc, response, status, headers) {
            console.info('onCancelTalaoNpc', fileTalaoNpc, response, status, headers);
        };
        uploader.onCompleteTalaoNpc = function(fileTalaoNpc, response, status, headers) {
            console.info('onCompleteTalaoNpc', fileTalaoNpc, response, status, headers);
            console.info('onCompleteITem',fileTalaoNpc.file.name);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


        // -------------------------------


        var controller = $scope.controller = {
            isImage: function(talaonpc) {
                var type = '|' + talaonpc.type.slice(talaonpc.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
    }]);