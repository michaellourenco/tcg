//'use strict';

angular
  .module('app.events', ['angularFileUpload','ngAnimate'])
.controller('EventsCtrl', ['$scope','$interval', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location','$log','$templateCache','combatesAPI','dadoAPI','charAPI', function($scope,$interval, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location,$log,$templateCache,combatesAPI,dadoAPI,charAPI) {
      $templateCache.removeAll();
     
	OWN_CARD_PLAY (Play(CONTROLLER));
	OWN_MINION_PLAY (Play(CONTROLLER, MINION));
	OWN_SECRET_PLAY (Play(CONTROLLER, SECRET));
	OWN_SPELL_PLAY (Play(CONTROLLER, SPELL));
	TURN_BEGIN (BeginTurn());
	OWN_TURN_BEGIN (BeginTurn(CONTROLLER));
	TURN_END (EndTurn());
	OWN_TURN_END (EndTurn(CONTROLLER));
	SELF_DAMAGE (Damage(SELF));

}]);