//'use strict';


angular


    .module('app.luta', ['angularFileUpload'])


    .controller('LutaCtrl', ['$scope','$interval', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location','$log','$templateCache','combatesAPI','dadoAPI','charAPI', function($scope,$interval, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location,$log,$templateCache,combatesAPI,dadoAPI,charAPI) {
      $templateCache.removeAll();
     
      namespace = $stateParams.namespace;
      id = $stateParams.id;
      idinimigo = $stateParams.idinimigo;  

      carregarCards = function () {
          $http.get("cards/cards.json", { headers: { 'Cache-Control' : 'no-cache' } }).success(function (data) {
            $scope.cardsh = data;
            $scope.deckInimigo=[];
            for(i=0; i<30; i++){
              $scope.deckInimigo.push( data[Math.floor(Math.random(2)*500)]);
            }
            $scope.deckJogador=[];
            for(i=0; i<30; i++){
              $scope.deckJogador.push( data[Math.floor(Math.random(2)*500)]);
            }
            $scope.maoJogador=[];
            for(i=0; i<7; i++){
              var idCardDeck = $scope.deckJogador[Math.floor(Math.random(1)*30)];
              console.info("id card deck", idCardDeck);
     
             $scope.maoJogador.push(idCardDeck);
              $scope.deckJogador != $scope.deckJogador.splice( idCardDeck,1);
             
            }
            $scope.maoInimigo=[];
            for(i=0; i<7; i++){
              var idCardDeckInimigo = $scope.deckInimigo[Math.floor(Math.random(1)*30)];
              console.info("id card deck", idCardDeckInimigo);
              //$scope.maoInimigo.splice($scope.deckInimigo[idCardDeck]);
              
             $scope.maoInimigo.push(idCardDeckInimigo);
              $scope.deckInimigo != $scope.deckInimigo.splice( idCardDeckInimigo,1);
             
            }
            console.info("deck do jogador", $scope.deckJogador);
            console.info("mao do jogador", $scope.maoJogador);
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
          $scope.per2 = npcs[$stateParams.idinimigo];   
          console.log($scope.per2);

        iniciativa =function(p1,p2){
          var p1ini = Math.floor(Math.random(p1.iniciativa)*20);
          var p2ini = Math.floor(Math.random(p2.iniciativa)*20);
          if(p1ini  > p2ini){
          $scope.message ="Iniciativa vencida por <strong>" + p1.titulo +"</strong> que tem "+p1ini+" enquanto "+p2.titulo+" tem "+p2ini;
          console.info('msg1', $scope.message);
          return turno(0,p1,p2);
          }else{
          $scope.message="Iniciativa vencida por <strong>"+ p2.titulo +"</strong> que tem "+p2ini+" enquanto "+p1.titulo+" tem "+p1ini;
                console.info('msg2', $scope.message);
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
               " =  "+danoTotal+" de dano<br/><strong>"+p1.titulo+"</strong> atacou e inflingiu <strong>"+
              danoI+"</strong> de dano em <strong>"+ p2.titulo +"</strong> que tinha <strong>"+ pa +"</strong><br/><strong>"+ p2.titulo+"</strong> perdeu pois ficou com <strong>"+ 
               p2.healthatual +"</strong> pontos de vida <br/>PARABENS <strong>"+ p1.titulo +"</strong> VOCE VENCEU!</p>";
            }
            else if(pv > 0){
             p2.healthatual = pv; 
              $scope.mesgenemi = "<p>TURNO "+ i++ +" | ATK "+ dano +
               " | DEF "+ def +
               " =  "+ danoTotal +" de dano<br/><strong>"+ p1.titulo +"</strong> atacou e inflingiu <strong>"+ danoI +
               "</strong> de dano em <strong>"+ p2.titulo +"</strong> que tinha <strong>"+ pa +"</strong><br/>Agora <strong>"+p2.titulo+"</strong> tem <strong>"+p2.healthatual+"</strong> pontos de vida restantes</p><br/>";
            }
          }
          else{
             $scope.mesgenemi = "<p>TURNO "+ i++ +" | <strong>"+ p1.titulo +"</strong> errou o ataque</p>";            
          }
        };

        $scope.turno =function(i,p1,p2){
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
              " =  "+danoTotal+" de dano<br/><strong>"+p1.titulo+"</strong> atacou e inflingiu <strong>"+
              danoI+"</strong> de dano em <strong>"+ p2.titulo +"</strong> que tinha <strong>"+ pa +"</strong><br/><strong>"+ p2.titulo+"</strong> perdeu pois ficou com <strong>"+ 
              p2.healthatual +"</strong> pontos de vida <br/>PARABENS <strong>"+ p1.titulo +"</strong> VOCE VENCEU!</p>";
            }
            else{
              p2.healthatual = pv;
              $scope.message = "<p>TURNO "+ i++ +" | ATK "+ dano +
              " =  "+ danoTotal +" de dano<br/><strong>"+ p1.titulo +"</strong> atacou e inflingiu <strong>"+ danoI +
              "</strong> de dano em <strong>"+ p2.titulo +"</strong> que tinha <strong>"+ pa +"</strong><br/>Agora <strong>"+p2.titulo+"</strong> tem <strong>"+p2.healthatual+"</strong> pontos de vida restantes</p><br/>";
            }
          }

        } 
        $scope.ataque =function(i,p1,p2){
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
              " =  "+danoTotal+" de dano<br/><strong>"+p1.titulo+"</strong> atacou e inflingiu <strong>"+
              danoI+"</strong> de dano em <strong>"+ p2.titulo +"</strong> que tinha <strong>"+ pa +"</strong><br/><strong>"+ p2.titulo+"</strong> perdeu pois ficou com <strong>"+ 
              p2.healthatual +"</strong> pontos de vida <br/>PARABENS <strong>"+ p1.titulo +"</strong> VOCE VENCEU!</p>";
            }
            else{
              p2.healthatual = pv;
              $scope.message = "<p>TURNO "+ i++ +" | ATK "+ dano +
              " =  "+ danoTotal +" de dano<br/><strong>"+ p1.titulo +"</strong> atacou e inflingiu <strong>"+ danoI +
              "</strong> de dano em <strong>"+ p2.titulo +"</strong> que tinha <strong>"+ pa +"</strong><br/>Agora <strong>"+p2.titulo+"</strong> tem <strong>"+p2.healthatual+"</strong> pontos de vida restantes</p><br/>";
            }
          }

        }         
  /*iniciativa(per2,per1);*/
        }).error(function (data, status) {
          $scope.message = "Aconteceu um problema: " + data;
        });
        dado = dadoAPI.getDado(20);
        console.log(dado);
      };
      carregarCombate(namespace);

  
    $scope.message="";
        $scope.controlador={
          turnoN:0,
          counter:0,
          counter2:0,
          counter3:0,

        }
      
      $scope.contador = function(nomeAtual,vezes,valor) {
        $interval(function() {
          console.info("nome: ", nomeAtual + vezes);
          if (nomeAtual < vezes -1 ) {
            $scope.controlador.counter += valor;
            nomeAtual +=valor;  
          } else{
              $scope.controlador.counter =0;
              nomeAtual =0;
            }
          }, 1000, vezes);
      }

      $scope.contador2 = function(nomeAtual,vezes,valor) {
        $interval(function() {
          console.info("nome: ", nomeAtual + vezes);
          if (nomeAtual < vezes -1 ) {
            $scope.controlador.counter2 += valor;
            nomeAtual +=valor;  
          } else{
              $scope.controlador.counter2 =0;
              nomeAtual =0;
            }
          }, 1000, vezes);
      }

      $scope.contador3 = function(nomeAtual,vezes,valor) {
        $interval(function() {
        console.info("nome: ", nomeAtual + vezes);
        if (nomeAtual < vezes -1 ) {
          $scope.controlador.counter3 += valor;
          nomeAtual +=valor;  
        } else{
            $scope.controlador.counter3 =0;
            nomeAtual =0;
          }
        }, 1000, vezes);
      }

      $scope.comprarCard = function(deck,mao, quantidade) {
          for(i=0; i<quantidade; i++){
            var idCardDeckAtual = $scope.deckJogador[Math.floor(Math.random(1)*deck.length)];
            console.info("id card deck atual", idCardDeckAtual);
            $scope.maoJogador.push(idCardDeckAtual);
            $scope.deckJogador != $scope.deckJogador.splice(idCardDeckAtual,1);          
          }
      }

      $scope.descartarCard = function(mesa,descarte, quantidade) {
          
            var idCardMesaAtual = $scope.mesaJogador[Math.floor(Math.random(1)*mesa.length)];
            console.info("id card deck atual", idCardMesaAtual);
            $scope.descarteJogador.push(idCardMesaAtual);
            $scope.mesaJogador != $scope.mesaJogador.splice(idCardMesaAtual,1);          
      
      }
     $scope.jogarCard = function(mao,mesa, quantidade) {
            var idPego = Math.floor(Math.random(1)*mao.length);
       
            var idCardMaoAtual = $scope.maoJogador[idPego];
            console.info("id card mao escolhida", idCardMaoAtual);
   
           $scope.mesaJogador.push(idCardMaoAtual);
           $scope.maoJogador != $scope.maoJogador.splice(idPego,1);
           
       
      }

      $scope.mesaJogador=[];
      $scope.descarteJogador=[];
      $scope.inicioTurno = function() {
        console.info("mao do jogador no inicio", $scope.maoJogador);
        $scope.controlador.turnoN +=1;
        $scope.message="Início do turno";
        $scope.comprarCard($scope.deckJogador,$scope.maoJogador, 1);
        $scope.contador($scope.controlador.counter,1,1);
        console.info("interval: ",$scope.controlador.counter);
        return $timeout($scope.acoesTurno, 1000);
          
      }
      $scope.acoesTurno = function() {
 
          $scope.message="Suas ações";            
          $scope.jogarCard($scope.maoJogador,$scope.mesaJogador, 1);
          if($scope.mesaJogador.length >=7){
            $scope.descartarCard($scope.mesaJogador,$scope.descarteJogador, 1);
          }
          $scope.ataque(1,$scope.per1,$scope.per2)
          $scope.contador2($scope.controlador.counter2,2,1);
          return $timeout($scope.fimTurno, 2000)
        
      }
      $scope.fimTurno = function() {

        $scope.message="Fim do turno";

        $scope.contador3($scope.controlador.counter3,1,1);
        return $timeout($scope.inicioTurno, 1000)
        
      }
      $timeout($scope.inicioTurno, 1000);

    }]);