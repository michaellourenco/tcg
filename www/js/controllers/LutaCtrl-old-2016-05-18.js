//'use strict';

angular
.module('app.luta', ['angularFileUpload','ngAnimate'])
.controller('LutaCtrl', 
  ['$scope',
  '$ionicPopup',
  '$interval', 
  'FileUploader',
  '$http',
  '$ionicModal', 
  '$timeout', 
  '$stateParams',
  '$location',
  '$log',
  '$templateCache',
  'combatesAPI',
  'dadoAPI',
  'mapaForcaAPI', 
  function(
    $scope,
    $ionicPopup,
    $interval, 
    FileUploader,
    $http, 
    $ionicModal, 
    $timeout, 
    $stateParams,
    $location,
    $log,
    $templateCache,
    combatesAPI,
    dadoAPI,
    mapaForcaAPI) {
    
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
       title: 'O que deseja fazer?',
       template: '<div class="card" style="width:100px; height:150px">'+card.name+'</div>',
       okText: 'jogarCard'
     });
     confirmPopup.then(function(res) {
       if(res) {
         $scope.jogarCard(id,card,mao,mesa,quantidade);

       } else {
         console.log('You are not sure');
       }
     });
   };
     
    namespace = $stateParams.namespace;
    id = $stateParams.id;
    idinimigo = $stateParams.idinimigo; 

    $scope.$watchCollection("maoJogador",function(newList, oldList){
        //console.log(" nvs: " + newList);
        //console.log(" ovs: " + oldList);
       // $scope.maoJogador = newList;
       // console.info("nova lista:", $scope.maoJogador)
    });

    // definindo controlador das informações do jogo
    $scope.controlador={
      manamax:0,
      manaatual:0,
      manamaxI:0,
      manaatualI:0,
      turnoN:0,
      counter:0,
      counter2:0,
      counter3:0,
      counterI:0,
      counter2I:0,
      counter3I:0
    } 
    carregarCards = function () {
      $http.get("cards/cards.json", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
        $scope.cardsh = data;
        $scope.deckInimigo=[];
        $scope.maoInimigo=[];
        $scope.mesaInimigo=[];
        $scope.message="";
        $scope.minion =[];
        console.info('cardsh', $scope.cardsh);

        // populando minions
        for(i=0; i<500; i++){
          if(data[i].type=="MINION"){
            data[i].id = data[i].id+i;
            data[i].active = false;
            $scope.minion.push(data[i]);
          }
        }

        // populando deck inicial do inimigo
        for(i=0; i<30; i++){
          $scope.deckInimigo.push( $scope.minion[Math.floor(Math.random()*200)]);
        }
        // populando mao inicial do inimigo
        for(i=0; i<5; i++){
          var idCardDeckInimigo = $scope.deckInimigo[Math.floor(Math.random()*30)];
          $scope.maoInimigo.push(idCardDeckInimigo);
          $scope.deckInimigo != $scope.deckInimigo.splice( idCardDeckInimigo,1);   
        }
      }).error(function (data, status) {
        $scope.message = "Aconteceu um problema: " + data;
      });
    };
    carregarCards();

    carregaDeckJogador= function () {
      $http.get("decks/meudeck.phtml", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
        var meuDeck=data;
        $scope.deckJogador= meuDeck;
        $scope.maoJogador=[];
        $scope.mesaJogador=[];

        console.info("meudeck", meuDeck);
 
        // populando mao inicial do jogador
        for(i=0; i<5; i++){
          var idCardDeck = $scope.deckJogador[Math.floor(Math.random()*(meuDeck.length-1))];
          //console.info("id card deck", idCardDeck);
          $scope.maoJogador.push(idCardDeck);
          $scope.deckJogador != $scope.deckJogador.splice( idCardDeck,1);             
        }
      }).error(function (data, status) {
        $scope.message = "Aconteceu um problema: " + data;
      });
    };
    carregaDeckJogador();

    carregarCombate = function (namespace){
      combatesAPI.getCombates().success(function (data) {
        $scope.combate = data; 
        var mapaForcas = $scope.combate.mapaForcas; 
        var npcs = $scope.combate.npcs;          
        $scope.per1 = mapaForcas[$stateParams.id]; 
          $scope.per1.active = false;   
        $scope.per2 = npcs[$stateParams.idinimigo];   
    }).error(function (data, status) {
        $scope.message = "Aconteceu um problema: " + data;
    })};
    carregarCombate(namespace);

    $scope.ataque =function(i,p1,p2){
      var pa = p2.telefoneContato;
      if(p1.naturezaOperacao>0){  
        p2.telefoneContato -=p1.naturezaOperacao;
      }
      if(p2.telefoneContato <= 0){
        $scope.message = "<p>TURNO "+ i++ +" <br/>"+ 
        p1.naturezaOperacao+" de dano<br/><strong>"+p1.name+"</strong>em <strong>"+ p2.name +"</strong> que tinha <strong>"+ pa +"</strong><br/><strong>"+ p2.name+"</strong> perdeu pois ficou com <strong>"+ 
        p2.telefoneContato +"</strong> pontos de vida <br/>PARABENS <strong>"+ p1.name +"</strong> VOCE VENCEU!</p>";
      }
      else{
        $scope.message = "<p>TURNO "+ i++ +"<br/>"+ p1.naturezaOperacao+" de dano<br/><strong>"+ p1.name +"</strong> em <strong>"+ $scope.per2.name +"</strong> que tinha <strong>"+ pa +"</strong><br/>Agora <strong>"+p2.name+"</strong> tem <strong>"+p2.telefoneContato+"</strong> pontos de vida restantes</p><br/>";
      }     
    };
  

    $scope.contador = function(nomeAtual,vezes,valor) {
      $interval(function() {
        if (nomeAtual < vezes -1 ) {
          $scope.controlador.counter += valor;
          nomeAtual +=valor;  
        }else{
            $scope.controlador.counter =0;
            nomeAtual =0;
          }
      }, 1000, vezes);
    }

    $scope.contador2 = function(nomeAtual,vezes,valor) {
      $interval(function() {
        if (nomeAtual < vezes -1 ) {
          $scope.controlador.counter2 += valor;
          nomeAtual +=valor;  
        }else{
          $scope.controlador.counter2 =0;
          nomeAtual =0;
        }
      }, 1000, vezes);
    }

    $scope.contador3 = function(nomeAtual,vezes,valor) {
     $interval(function() {
        if (nomeAtual < vezes -1 ) {
          $scope.controlador.counter3 += valor;
          nomeAtual +=valor;  
        } else{
          $scope.controlador.counter3 =0;
          nomeAtual =0;
        }
      }, 1000, vezes);
    }

    $scope.atualizaStatus = function(mao,mesa){
      // permitindo que o jogador jogue as cartas na mesa
      if(mao.length!=0){
        for(i=0; i<=mao.length-1; i++){
          if(mao[i]!=undefined && mao[i].unidadesSolicitantes <= $scope.controlador.manaatual){
            mao[i].active = true;
          }else if(mao[i]!=undefined && mao[i].unidadesSolicitantes >= $scope.controlador.manaatual){
            mao[i].active = false;
          }
        }
      } 
      //permitindo que o jogador ataque com as cartas da mesa
      if(mesa.length!=0){
        for(i=0; i<=mesa.length-1; i++){
          if(mesa[i]!=undefined){
            mesa[i].active = true;
          }  
        }
      } 
      $scope.maoJogador = mao;
      $scope.mesaJogador = mesa;
    };

    $scope.comprarCard = function(deck,mao, quantidade) {
      for(i=0; i<quantidade; i++){
        var idPego = Math.floor(Math.random(1)*(deck.length-1));
        var idCardDeckAtual = $scope.deckJogador[idPego];
        if($scope.maoJogador.length >=10){
          $scope.descartarCard(idPego,idCardDeckAtual,$scope.descarteJogador, 1);
        }
        else{
          $scope.maoJogador.push(idCardDeckAtual);
        }
        $scope.deckJogador != $scope.deckJogador.splice(idPego,1);          
      }
    }

    $scope.descartarCard = function(idCard,card,descarte, quantidade) {  
      if(card.type != "MINION"){
        $scope.descarteJogador.push(card);      
        $scope.maoJogador != $scope.maoJogador.splice(idCard,1); 
      }else{
        $scope.descarteJogador.push(card);
        $scope.mesaJogador != $scope.mesaJogador.splice(idCard,1);          
      }
    }

    $scope.jogarCard = function(idCard,card, mao, mesa, quantidade) {   
      if(card.type != "MINION"){
        $scope.descartarCard(idCard,card,$scope.descarteJogador, 1);  
        $scope.controlador.manaatual -= card.unidadesSolicitantes;   
      }
      else{
        $scope.mesaJogador.push(card);
        $scope.controlador.manaatual -= card.unidadesSolicitantes;   
      }     
      $scope.maoJogador !=$scope.maoJogador.splice(idCard,1);    
      $scope.atualizaStatus($scope.maoJogador,$scope.mesaJogador);
    }
    $scope.fase = function(funcao,tempo){
      setTimeout(funcao, tempo);
    }
    function limpaTempo(){
      clearTimeout($scope.fase);
      $interval.cancel($scope.contador2.$interval);
    }

    $scope.inicioTurno = function() {
      // aidiciona um ao contador de turno
      $scope.controlador.turnoN +=1;
      if($scope.controlador.manamax >= 10){
        $scope.controlador.manamax = 10;
        $scope.controlador.manaatual = $scope.controlador.manamax;
      }else{
        $scope.controlador.manamax +=1;
        $scope.controlador.manaatual = $scope.controlador.manamax;
      }
      $scope.message="Início do turno";
      // se o deck do jogador estiver vazio, ele deve receber dano
      if($scope.deckJogador <= 0){
        $scope.per1.telefoneContato -=1;
      }else{
        // comprar uma carta no inicio do turno
        $scope.comprarCard($scope.deckJogador,$scope.maoJogador, 1);
      }
      $scope.contador($scope.controlador.counter,5,1);
      //console.info("interval: ",$scope.controlador.counter);
      return $scope.fase($scope.acoesTurno, 5000);        
    }

    $scope.acoesTurno = function() {
      $scope.message="Suas ações";            
      // permitindo que o jogador ataque com o personagem
      $scope.per1.active = true;
      // atualiza os status da mao e mesa
      $scope.atualizaStatus($scope.maoJogador,$scope.mesaJogador);  
      $scope.contador2($scope.controlador.counter2,10,1);
      return $scope.fase($scope.fimTurno, 10000)    
    }

    $scope.fimTurno = function() {
      limpaTempo();
      $scope.per1.active = false;
      if($scope.maoJogador.length!=0){
        for(i=0; i<=$scope.maoJogador.length -1; i++){
          if($scope.maoJogador[i]!=undefined){
            $scope.maoJogador[i].active = false;
          }  
        }
      } 
      if($scope.mesaJogador.length!=0){
        for(i=0; i<=$scope.mesaJogador.length -1; i++){
          if($scope.mesaJogador[i]!=undefined){
            $scope.mesaJogador[i].active = false;
          }  
        }
      } 
      $scope.message="Fim do turno";
      $scope.contador3($scope.controlador.counter3,5,1);   
      return $scope.fase($scope.inicioTurnoI, 5000)   
    }

    // INIMIGO
    $scope.contadorI = function(nomeAtual,vezes,valor) {
      $interval(function() {
        if (nomeAtual < vezes -1 ) {
          $scope.controlador.counter += valor;
          nomeAtual +=valor;  
        }else{
          $scope.controlador.counter =0;
          nomeAtual =0;
          }
      }, 1000, vezes);
    }

    $scope.contador2I = function(nomeAtual,vezes,valor) {
      $interval(function() {
        if (nomeAtual < vezes -1 ) {
          $scope.controlador.counter2 += valor;
          nomeAtual +=valor;  
        }else{
          $scope.controlador.counter2 =0;
          nomeAtual =0;
        }
      }, 1000, vezes);
    }

    $scope.contador3I = function(nomeAtual,vezes,valor) {
      $interval(function() {
        if (nomeAtual < vezes -1 ) {
          $scope.controlador.counter3 += valor;
          nomeAtual +=valor;  
        } else{
          $scope.controlador.counter3 =0;
          nomeAtual =0;
        }
      }, 1000, vezes);
    }

    $scope.atualizaStatusI = function(maoI,mesaI){
      // permitindo que o inimigo jogue as cartas na mesa
      if(maoI.length!=0){
        for(i=0; i<=maoI.length-1; i++){
          if(maoI[i]!=undefined && maoI[i].unidadesSolicitantes <= $scope.controlador.manaatualI){
            maoI[i].active = true;
          }else if(maoI[i]!=undefined && maoI[i].unidadesSolicitantes >= $scope.controlador.manaatualI){
            maoI[i].active = false;
          }
        }
      } 

      //permitindo que o inimigo ataque com as cartas da mesa
      if(mesaI.length!=0){
        for(i=0; i<=mesaI.length-1; i++){
          if(mesaI[i]!=undefined){
            mesaI[i].active = true;
          }  
        }
      }   
      $scope.maoInimigo = maoI;
      $scope.mesaInimigo = mesaI;
    };

    $scope.comprarCardI = function(deck,mao, quantidade) {
      for(i=0; i<quantidade; i++){
        var idPego = Math.floor(Math.random(1)*(deck.length-1));
        var idCardDeckAtual = $scope.deckInimigo[idPego];
        if($scope.maoInimigo.length >=10){
          $scope.descartarCardI(idPego,idCardDeckAtual,$scope.descarteInimigo, 1);
        }
        else{
          $scope.maoInimigo.push(idCardDeckAtual);
        }
        $scope.deckInimigo != $scope.deckInimigo.splice(idPego,1);          
      }
    }

    $scope.descartarCardI = function(idCard,card,descarte, quantidade) {  
      if(card.type != "MINION"){
        $scope.descarteInimigo.push(card);      
        $scope.maoInimigo != $scope.maoInimigo.splice(idCard,1); 
      }else{
        $scope.descarteInimigo.push(card);
        $scope.mesaInimigo != $scope.mesaInimigo.splice(idCard,1);          
      }
    }

    $scope.jogarCardI = function(maoI,mesaI,quantidade) {
      var idPegoI = Math.floor(Math.random()*maoI.length);
      var idCardMaoAtualI = $scope.maoInimigo[idPegoI];
      if(idCardMaoAtualI.type!="MINION"){
        $scope.descartarCardI(idPegoI,idCardMaoAtualI,$scope.descarteInimigo,1)
      }
      else{$scope.mesaInimigo.push(idCardMaoAtualI)};
        $scope.maoInimigo != $scope.maoInimigo.splice(idPegoI,1);
    }

    $scope.inicioTurnoI = function() {
      // aidiciona um ao contador de turno
      $scope.controlador.turnoN +=1;
      if($scope.controlador.manamaxI >= 10){
        $scope.controlador.manamaxI = 10;
        $scope.controlador.manaatualI = $scope.controlador.manamaxI;
      }else{
        $scope.controlador.manamaxI +=1;
        $scope.controlador.manaatualI = $scope.controlador.manamaxI;
      }
      $scope.message="Início do turno";
      // se o deck do inimigo estiver vazio, ele deve receber dano
      if($scope.deckInimigo <= 0){
        $scope.per2.telefoneContato -=1;
      }else{
        // comprar uma carta no inicio do turno
        $scope.comprarCardI($scope.deckInimigo,$scope.maoInimigo, 1);
      }
      $scope.contadorI($scope.controlador.counterI,5,1);
      return $scope.fase($scope.acoesTurnoI, 5000);        
    }

    $scope.acoesTurnoI = function() {
      $scope.message="Suas ações";            
      // permitindo que o inimigo ataque com o personagem
      $scope.per2.active = true;
      $scope.jogarCardI($scope.maoInimigo,$scope.mesaInimigo,1);
      $scope.ataque(1,$scope.per2,$scope.per1);
      // atualiza os status da mao e mesa
      $scope.atualizaStatusI($scope.maoInimigo,$scope.mesaInimigo);
      $scope.contador2I($scope.controlador.counter2I,10,1);
      return $scope.fase($scope.fimTurnoI, 10000)    
    }

    $scope.fimTurnoI = function() {
      $scope.per1.active = false;
      if($scope.maoInimigo.length!=0){
        for(i=0; i<=$scope.maoInimigo.length -1; i++){
          if($scope.maoInimigo[i]!=undefined){
            $scope.maoInimigo[i].active = false;
          }  
        }
      } 
      if($scope.mesaInimigo.length!=0){
        for(i=0; i<=$scope.mesaInimigo.length -1; i++){
          if($scope.mesaInimigo[i]!=undefined){
            $scope.mesaInimigo[i].active = false;
          }  
        }
      } 
      $scope.message="Fim do turno";
      $scope.contador3I($scope.controlador.counter3I,5,1);         
      return $scope.fase($scope.inicioTurno, 5000)   
    }

    $scope.fase($scope.inicioTurno, 1000);

}]);