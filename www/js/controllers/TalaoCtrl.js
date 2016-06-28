//'use strict';


angular


  .module('app.talao', ['angularFileUpload'])

  .controller('TalaoCtrl',  ['$scope', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location', function($scope, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location) {
   

    console.log($stateParams.namespace);
    console.log($stateParams.id);

    namespace = $stateParams.namespace;
    id = $stateParams.id;
    if($stateParams.idtalao !=null){
      idtalao = $stateParams.idtalao;
      console.info('id da talao', $stateParams.idtalao);
    }

    carregarCombate = function (namespace){
      $http.get("combates/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
        console.log(data);
        $scope.combate = data; 
        $scope.mapaForca = data.mapaForcas[$stateParams.id];    
        $scope.talao = data.mapaForcas[$stateParams.id].talaos[$stateParams.idtalao];
        console.log($scope.mapaForca.name);
      }).error(function (data, status) {
        $scope.message = "Aconteceu um problema: " + data;
      });
    };
    
    carregarCombate(namespace);

    $scope.adicionarTalao = function (talao){
      console.log($scope.combate.mapaForcas[$stateParams.id].talaos != null);
      console.log($stateParams.id);
      if($scope.combate.mapaForcas[$stateParams.id].talaos != null){
        $scope.combate.mapaForcas[$stateParams.id].talaos.push(talao);
      }else{
        $scope.combate.mapaForcas[$stateParams.id].talaos = [];
        $scope.combate.mapaForcas[$stateParams.id].talaos.push(talao);
      };
      $http.post("editarcombate.php", $scope.combate).success(function (data) {
        /*delete $scope.combate;*/
        /*$scope.mapaForcaForm.$setPristine();*/
        $location.path("/app/combate/"+namespace);
        console.log($location.path());
      });
    };

    $scope.editarTalao = function (talao){
      $scope.combate != $scope.combate.mapaForcas[$stateParams.id].talaos.splice($stateParams.idtalao,1,talao);      
      $http.post("editarcombate.php", $scope.combate).success(function (data) {
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
            fn: function(talao /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(talao /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', talao, filter, options);
        };
        uploader.onAfterAddingFile = function(fileTalao) {
            console.info('onAfterAddingFile', fileTalao);
        };
        uploader.onAfterAddingAll = function(addedFileTalaos) {
            console.info('onAfterAddingAll', addedFileTalaos);
        };
        uploader.onBeforeUploadTalao = function(talao) {
            console.info('onBeforeUploadTalao', talao);
        };
        uploader.onProgressTalao = function(fileTalao, progress) {
            console.info('onProgressTalao', fileTalao, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessTalao = function(fileTalao, response, status, headers) {
            console.info('onSuccessTalao', fileTalao, response, status, headers);
        };
        uploader.onErrorTalao = function(fileTalao, response, status, headers) {
            console.info('onErrorTalao', fileTalao, response, status, headers);
        };
        uploader.onCancelTalao = function(fileTalao, response, status, headers) {
            console.info('onCancelTalao', fileTalao, response, status, headers);
        };
        uploader.onCompleteTalao = function(fileTalao, response, status, headers) {
            console.info('onCompleteTalao', fileTalao, response, status, headers);
            console.info('onCompleteITem',fileTalao.file.name);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
        // -------------------------------


        var controller = $scope.controller = {
            isImage: function(talao) {
                var type = '|' + talao.type.slice(talao.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
        
    }]);