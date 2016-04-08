//'use strict';

angular
  .module('app.luta', ['angularFileUpload','ngAnimate'])
.controller('LutaCtrl', ['$scope','$interval', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location','$log','$templateCache','combatesAPI','dadoAPI','charAPI', function($scope,$interval, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location,$log,$templateCache,combatesAPI,dadoAPI,charAPI) {
      $templateCache.removeAll();
     
    namespace = $stateParams.namespace;
    id = $stateParams.id;
    idinimigo = $stateParams.idinimigo; 

    $scope.$watchCollection("maoJogador",function(newList, oldList){
        //console.log(" nvs: " + newList);
        //console.log(" ovs: " + oldList);
       // $scope.maoJogador = newList;
       // console.info("nova lista:", $scope.maoJogador)
    });
    carregarCards = function () {
      $http.get("cards/cards.json", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
        $scope.cardsh = data;
        $scope.deckInimigo=[];
        $scope.maoInimigo=[];
        $scope.deckJogador=[];
        $scope.maoJogador=[]; 
        $scope.mesaJogador=[];
        $scope.descarteJogador=[];
        $scope.message="";
        $scope.minion =[];
        // definindo controlador das informações do jogo
        $scope.controlador={
          manamax:0,
          manaatual:0,
          manamaxI:0,
          manaatualI:0,
          turnoN:0,
          counter:0,
          counter2:0,
          counter3:0
        } 
        // populando minions
        for(i=0; i<500; i++){
          if(data[i].type=="MINION"){
            data[i].id = data[i].id+i;
            data[i].active = false;
            $scope.minion.push(data[i]);
          }
        }
        console.info("minions: ", $scope.minion);
        // populando deck inicial do inimigo
        for(i=0; i<30; i++){
          $scope.deckInimigo.push( data[Math.floor(Math.random()*500)]);
        }
        // populando deck inicial do jogador
        for(i=0; i<30; i++){
          $scope.deckJogador.push($scope.minion[Math.floor(Math.random()*200)]);
        }
        // populando mao inicial do jogador
        for(i=0; i<5; i++){
          var idCardDeck = $scope.deckJogador[Math.floor(Math.random()*30)];
          //console.info("id card deck", idCardDeck);
          $scope.maoJogador.push(idCardDeck);
          $scope.deckJogador != $scope.deckJogador.splice( idCardDeck,1);             
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

    carregarCombate = function (namespace){
      combatesAPI.getCombates().success(function (data) {
        $scope.combate = data; 
        var chars = $scope.combate.chars; 
        var npcs = $scope.combate.npcs;          
        $scope.per1 = chars[$stateParams.id]; 
          $scope.per1.active = false;   
        $scope.per2 = npcs[$stateParams.idinimigo];   
        iniciativa =function(p1,p2){
          var p1ini = Math.floor(Math.random(p1.iniciativa)*20);
          var p2ini = Math.floor(Math.random(p2.iniciativa)*20);
          if(p1ini  > p2ini){
          $scope.message ="Iniciativa vencida por <strong>" + p1.name +"</strong> que tem "+p1ini+" enquanto "+p2.name+" tem "+p2ini;
          return turno(0,p1,p2);
          }else{
          $scope.message="Iniciativa vencida por <strong>"+ p2.name +"</strong> que tem "+p2ini+" enquanto "+p1.name+" tem "+p1ini;        
          return turno(0,p2,p1);       
      }           
    } 

    turnoInimigo = function(i,p1,p2){
      pv=p2.healthatual;
      pa=p2.healthatual; 
      var p1attack = Math.floor(Math.random(p1.attack)*20);
      var p2defense = Math.floor(Math.random(p2.defense)*20);
      if(p1attack>p2defense){  
        dano=p1attack;
        def=p2defense;
        danoTotal=dano-def;
        if(danoTotal > 0){
          danoI = danoTotal;
          pv -=danoI;
        }
        else{
          danoI=1;
          pv -=danoI;
        }
        if(pv <= 0){
          p2.healthatual = pv;
          $scope.mesgenemi = "<p>TURNO "+ i++ +" | "+ 
          "ATK "+dano+
          " | DEF "+def +
          " =  "+danoTotal+" de dano<br/><strong>"+p1.name+"</strong> atacou e inflingiu <strong>"+
          danoI+"</strong> de dano em <strong>"+ p2.name +"</strong> que tinha <strong>"+ pa +"</strong><br/><strong>"+ p2.name+"</strong> perdeu pois ficou com <strong>"+ 
          p2.healthatual +"</strong> pontos de vida <br/>PARABENS <strong>"+ p1.name +"</strong> VOCE VENCEU!</p>";
        }
        else if(pv > 0){
          p2.healthatual = pv; 
          $scope.mesgenemi = "<p>TURNO "+ i++ +" | ATK "+ dano +
          " | DEF "+ def +
          " =  "+ danoTotal +" de dano<br/><strong>"+ p1.name +"</strong> atacou e inflingiu <strong>"+ danoI +
          "</strong> de dano em <strong>"+ p2.name +"</strong> que tinha <strong>"+ pa +"</strong><br/>Agora <strong>"+p2.name+"</strong> tem <strong>"+p2.healthatual+"</strong> pontos de vida restantes</p><br/>";
        }
      }
      else{
         $scope.mesgenemi = "<p>TURNO "+ i++ +" | <strong>"+ p1.name +"</strong> errou o ataque</p>";            
      }
    };

   /* $scope.turno =function(i,p1,p2){
      pv=p2.healthatual;
      pa=p2.healthatual; 
      var p1attack = p1.attack
      if(p1attack>0){  
        dano=p1attack;
        danoTotal=dano;
        if(danoTotal > 0){
          danoI = danoTotal;
          pv -=danoI;
        }
        if(pv <= 0){
          p2.healthatual = pv;
          $scope.message = "<p>TURNO "+ i++ +" | "+ 
          "ATK "+dano+
          " =  "+danoTotal+" de dano<br/><strong>"+p1.name+"</strong> atacou e inflingiu <strong>"+
          danoI+"</strong> de dano em <strong>"+ p2.name +"</strong> que tinha <strong>"+ pa +"</strong><br/><strong>"+ p2.name+"</strong> perdeu pois ficou com <strong>"+ 
          p2.healthatual +"</strong> pontos de vida <br/>PARABENS <strong>"+ $scope.p2.name +"</strong> VOCE VENCEU!</p>";
        }
        else{
          p2.healthatual = pv;
          $scope.message = "<p>TURNO "+ i++ +" | ATK "+ dano +
          " =  "+ danoTotal +" de dano<br/><strong>"+ p1.name +"</strong> atacou e inflingiu <strong>"+ danoI +
          "</strong> de dano em <strong>"+ p2.name +"</strong> que tinha <strong>"+ pa +"</strong><br/>Agora <strong>"+p2.name+"</strong> tem <strong>"+p2.healthatual+"</strong> pontos de vida restantes</p><br/>";
        }
      }
    } */

    $scope.ataque =function(i,p1,p2){
      var pa = p2.healthatual;
      if(p1.attack>0){  
          p2.healthatual -=p1.attack;
        }
        if(p2.healthatual <= 0){
          
          $scope.message = "<p>TURNO "+ i++ +" <br/>"+ 
          p1.attack+" de dano<br/><strong>"+p1.name+"</strong>em <strong>"+ p2.name +"</strong> que tinha <strong>"+ pa +"</strong><br/><strong>"+ p2.name+"</strong> perdeu pois ficou com <strong>"+ 
          p2.healthatual +"</strong> pontos de vida <br/>PARABENS <strong>"+ $scope.per1.name +"</strong> VOCE VENCEU!</p>";
        }
        else{
          
          $scope.message = "<p>TURNO "+ i++ +"<br/>"+ p1.attack+" de dano<br/><strong>"+ p1.name +"</strong> em <strong>"+ $scope.per2.name +"</strong> que tinha <strong>"+ pa +"</strong><br/>Agora <strong>"+p2.name+"</strong> tem <strong>"+p2.healthatual+"</strong> pontos de vida restantes</p><br/>";
        }
      
    }         
      }).error(function (data, status) {
        $scope.message = "Aconteceu um problema: " + data;
      });
    };

    carregarCombate(namespace);
     
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
          if(mao[i]!=undefined && mao[i].cost <= $scope.controlador.manaatual){
            mao[i].active = true;
          }else if(mao[i]!=undefined && mao[i].cost >= $scope.controlador.manaatual){
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
      
     console.info("ID", idCard);
      console.info("carta pega", card);
      if(card.type != "MINION"){
          $scope.descartarCard(idCard,card,$scope.descarteJogador, 1);  
          $scope.controlador.manaatual -= card.cost;   
      }
      else{
          $scope.mesaJogador.push(card);
          $scope.controlador.manaatual -= card.cost;   
      }
      
      $scope.maoJogador !=$scope.maoJogador.splice(idCard,1);
    
      $scope.atualizaStatus($scope.maoJogador,$scope.mesaJogador);
      console.info("pos jogar:", mao);
    }

    $scope.fase = function(funcao,tempo){
        setTimeout(funcao, tempo);
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
          $scope.per1.healthatual -=1;
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

    $scope.fase($scope.inicioTurno, 1000);

}]);