//'use strict';


angular


  .module('app.skill', ['angularFileUpload'])

  .controller('SkillCtrl',  ['$scope', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location', function($scope, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location) {
   

    console.log($stateParams.namespace);
    onsole.log($stateParams.id);

    namespace = $stateParams.namespace;
    id = $stateParams.id;
    if($stateParams.idskill !=null){
      idskill = $stateParams.idskill;
      console.info('id da skill', $stateParams.idskill);
    }

    carregarCombate = function (namespace){
      $http.get("combates/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
        console.log(data);
        $scope.combate = data; 
        $scope.char = data.chars[$stateParams.id];    
        $scope.skill = data.chars[$stateParams.id].skills[$stateParams.idskill];
        console.log($scope.char.name);
      }).error(function (data, status) {
        $scope.message = "Aconteceu um problema: " + data;
      });
    };
    
    carregarCombate(namespace);

    $scope.adicionarSkill = function (skill){
      console.log($scope.combate.chars[$stateParams.id].skills != null);
      console.log($stateParams.id);
      if($scope.combate.chars[$stateParams.id].skills != null){
        $scope.combate.chars[$stateParams.id].skills.push(skill);
      }else{
        $scope.combate.chars[$stateParams.id].skills = [];
        $scope.combate.chars[$stateParams.id].skills.push(skill);
      };
      $http.post("editarcombate.php", $scope.combate).success(function (data) {
        /*delete $scope.combate;*/
        /*$scope.charForm.$setPristine();*/
        $location.path("/app/combate/"+namespace);
        console.log($location.path());
      });
    };

    $scope.editarSkill = function (skill){
      $scope.combate != $scope.combate.chars[$stateParams.id].skills.splice($stateParams.idskill,1,skill);      
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
            fn: function(skill /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(skill /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', skill, filter, options);
        };
        uploader.onAfterAddingFile = function(fileSkill) {
            console.info('onAfterAddingFile', fileSkill);
        };
        uploader.onAfterAddingAll = function(addedFileSkills) {
            console.info('onAfterAddingAll', addedFileSkills);
        };
        uploader.onBeforeUploadSkill = function(skill) {
            console.info('onBeforeUploadSkill', skill);
        };
        uploader.onProgressSkill = function(fileSkill, progress) {
            console.info('onProgressSkill', fileSkill, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessSkill = function(fileSkill, response, status, headers) {
            console.info('onSuccessSkill', fileSkill, response, status, headers);
        };
        uploader.onErrorSkill = function(fileSkill, response, status, headers) {
            console.info('onErrorSkill', fileSkill, response, status, headers);
        };
        uploader.onCancelSkill = function(fileSkill, response, status, headers) {
            console.info('onCancelSkill', fileSkill, response, status, headers);
        };
        uploader.onCompleteSkill = function(fileSkill, response, status, headers) {
            console.info('onCompleteSkill', fileSkill, response, status, headers);
            console.info('onCompleteITem',fileSkill.file.name);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
        // -------------------------------


        var controller = $scope.controller = {
            isImage: function(skill) {
                var type = '|' + skill.type.slice(skill.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };
        
    }]);