//'use strict';


angular


    .module('app.cards', ['angularFileUpload'])


    .controller('CardsCtrl', ['$scope','$ionicPopup', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location','$log','$templateCache','combatesAPI','dadoAPI','cardAPI', function($scope,$ionicPopup, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location,$log,$templateCache,combatesAPI,dadoAPI,cardAPI) {
     $templateCache.removeAll();
     
 $scope.showPopup = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="password" ng-model="data.wifi">',
     title: 'Enter Wi-Fi Password',
     subTitle: 'Please use normal things',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!$scope.data.wifi) {
             //don't allow the user to close unless he enters wifi password
             e.preventDefault();
           } else {
             return $scope.data.wifi;
           }
         }
       },
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 3000);
  };
   // A confirm dialog
   $scope.showConfirm = function(id,card,mao,mesa,quantidade) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: card,
       okText: 'jogarCard'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log(card);
       } else {
         console.log('You are not sure');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };
        carregarCards = function () {
            $http.get("cards/cards.json", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
            $scope.cardsh = data;
            console.info("cards do hearthstone", $scope.cardsh);
            }).error(function (data, status) {
            $scope.message = "Aconteceu um problema: " + data;
            });
        };
        carregarCards();
    $scope.deck=[];
    $scope.addCard = function(idCard,card, colecao, deck, quantidade) {
      console.info("carta: ", card);
          $scope.deck.push(card);
    }
    $scope.removeCard = function(idCard,card, colecao, deck, quantidade) {
          $scope.deck != $scope.deck.splice(idCard,1); 
    }
      $scope.editarCombate = function (combate,skill){
        if(skill!= null){

            }else{
            combatesAPI.saveCombate(combate).success(function (data) {
              $location.path("/app/combate/"+namespace);
            });
        }
      };

      $scope.novoDeck = function (card){
        console.info('deck enviado: ', card);
        if($scope.deck != null){
         $scope.deck.push(card);
        }else{
          $scope.deck = [];
          $scope.deck.push(card);
        }; 
        
        $http.post("editardeck.php", $scope.deck).success(function (data) {
          $location.path("/app/cards/");
        });
                console.info('deck enviado: ', $scope.deck);
      };

      $scope.apagarSkill = function (indiceSkill,indiceCard){
        $scope.combate != $scope.combate.cards[indiceCard].itens.splice(indiceSkill,1);      
        combatesAPI.saveCombate($scope.combate).success(function (data) {
          /*delete $scope.combate;*/
          $location.path("/app/combate/"+namespace);
        });
      };

      $scope.apagarCard = function (indiceCard){
        $scope.combate != $scope.combate.cards.splice(indiceCard,1);      
        combatesAPI.saveCombate($scope.combate).success(function (data) {
          /*delete $scope.combate;*/
          $location.path("/app/combate/"+namespace);
        });
      };
 
  
   
      



     /* $scope.combater= function (){
        var p = new Personagem();
        var pMapper = new PersonagemMapper();
        pMapper.find(1,p);
    
        var px = new Personagem();
        var pxMapper = new PersonagemMapper();
        pxMapper.find(2,px);   
        
        var combate = new Combate();
 
        combate->iniciativa(p,px);
      };*/  
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
        $http.get("cardapios/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
          mudado = {logo:"2.jpg"};      
          item.formData.push(mudado);
          item.formData.push(data);
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
      };

      uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $http.get("cardapios/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {  

        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });      
        console.info('response'+response);
        fileItem.formData[1].categorias[$stateParams.id].itens[$stateParams.iditem].imagem = fileItem.file.name;
        informacao = fileItem.formData[1];
        $http.post("editarcardapio.php", informacao).success(function (data) {
          /*delete $scope.cardapio;
          $scope.categoriaForm.$setPristine();*/
           $location.path("/app/cardapio/"+namespace);
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