//'use strict';

angular
.module('app.lutacnv', ['angularFileUpload','ngAnimate'])
.controller('LutaCnvCtrl', 
  ['$scope',
  '$window',
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
    $window,
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


var canv = document.getElementById('board');
var ctx = canv.getContext('2d');
  //Arrays
  var sprites = [];
  var blocks = [];
var catX = catY = hyp = 0;

var d=220;
var n = 4;
var x = 40, y = 40;
var a = (Math.sqrt(3)-1)/2*d;
var h = a*Math.sqrt(3)/2;
var t1 = a/2+h;


  //Objetos instanciados com os seguintes parâmetros: posX, posY, Largura, Altura e cor
  var mapaForcaacter = new Sprite(50, 175, 50, 50, "#00f");
  mapaForcaacter.speed = 4;
  sprites.push(mapaForcaacter);
  
  var block1 = new Sprite(500, 100, 50, 50, "#f00");
  sprites.push(block1);
  blocks.push(block1);
  
  var block2 = new Sprite(200, 300, 100, 50, "#8B6914");
  sprites.push(block2);
  blocks.push(block2);
  
  var block3 = new Sprite(50, 100, 20, 150 , "#7F7F7F");
  sprites.push(block3);
  blocks.push(block3);
  

  var update = function(){
    //Colisões
    for(var i in blocks){
      var blk = blocks[i];
      if(blk.visible){
        blockRect(blk,mapaForcaacter);
      }
    }
    for(cardJogador in $scope.maoJogador){
      canv.addEventListener('mousedown',function(e){
        catX = $scope.maoJogador[cardJogador].x - e.offsetX;
        catY = $scope.maoJogador[cardJogador].y - e.offsetY;
        hyp = Math.sqrt(catX*catX + catY*catY);
        console.log($scope.maoJogador[cardJogador].prefixoViatura);
        console.info("h, cy,cy:", hyp + "" + catX+ ""+catY);
        if(hyp < $scope.maoJogador[cardJogador].radius && !$scope.maoJogador[cardJogador].held){
          //cardJogador.held = cardJogador.held ? false:true;
          console.log($scope.maoJogador[cardJogador].prefixoViatura);
          $scope.maoJogador[cardJogador].held = true;
        }
      },false);
      canv.addEventListener('mouseup',function(){
        if($scope.maoJogador[cardJogador].held){
          $scope.maoJogador[cardJogador].held=false;
        }
      },false);
      canv.addEventListener('mousemove',function(e){
        if($scope.maoJogador[cardJogador].held){
          $scope.maoJogador[cardJogador].x = e.offsetX;
          $scope.maoJogador[cardJogador].y = e.offsetY;
          console.log($scope.maoJogador[cardJogador].prefixoViatura);
      }
    },false); 
    }
  }
  var acoes=false;
  var render = function(){
    console.info("acoes", acoes);
   if(acoes=true){
      var x = 100;
      var y = 430;
      ctx.clearRect(0,0,900,600);
      for(cardJogador in $scope.maoJogador){
        //if($scope.maoJogador[cardJogador].active){
          console.log(cardJogador);
          console.log($scope.maoJogador[cardJogador]);

          ctx.beginPath();
 
          ctx.fillStyle = "#0000f0";
          ctx.fillRect(x, y, 95, 150);
          ctx.fillStyle = "#00c0c0";
          ctx.font = "12px Arial";
          ctx.fillText($scope.maoJogador[cardJogador].unidadesSolicitantes,x+10, y+15);
          ctx.fillText($scope.maoJogador[cardJogador].name,x+5, y+40);
          ctx.fillText($scope.maoJogador[cardJogador].naturezaOperacao,x+10, y+140);
          ctx.fillText($scope.maoJogador[cardJogador].prefixoViatura,x+70, y+140);
          ctx.closePath();
          ctx.fill();

    for(var i in sprites){
      var spr = sprites[i];
      if(spr.visible){
        ctx.fillStyle = spr.color;
        ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
      }
    }  
       // }
       /*if(!$scope.maoJogador[cardJogador].active){            
          ctx.beginPath();
          ctx.fillStyle = "#000";
          ctx.arc(80+x,90,cardJogador.unidadesSolicitantes*5,0,Math.PI*2);
          ctx.closePath();
          ctx.fill();
        }*/
        x +=100;
      }
   }else{console.log("ainda nao ativo")}

  }   
  $scope.$watchCollection ("[maoJogador,deckJogador,mesaJogador]", function( newValue, oldValue ) {
   // window.st = $scope.st;
   // window.stw = $scope.stw;
   // draw($scope.sq, $scope.t1, $scope.t2, $scope.d);
            console.info('novojogador', $scope.deckJogador);
            update();
            render();
  });
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
       template: '<div class="card" style="width:150px; height:225px">'+cardJogador.name+'</div>',
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
         $scope.deckJogador=[];
                // populando minions
        for(i=0; i<meuDeck.length-1; i++){
          if(data[i].type=="MINION"){
            data[i].id = data[i].id+i;
            data[i].active = false;
            data[i].radius=40;
            data[i].x=90;
            data[i].y=150;
            data[i].color=="#00f";
            data[i].held=false;
            $scope.deckJogador.push(data[i]);
          }
        }

        $scope.maoJogador=[];
        $scope.mesaJogador=[];

        console.info("meudeck", $scope.deckJogador);
 
        // populando mao inicial do jogador
        for(i=0; i<5; i++){
          var idCardDeck = $scope.deckJogador[Math.floor(Math.random()*(meuDeck.length-1))];
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
    this.MoveCard = function(source, destination, cardId) {
     if(cardId>0){
     destination.push(source[source.indexOf(cardId)])
     source.splice(source.indexOf(cardId), 1)
     }else{
         destination.push(source.shift())
    }}
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
      if(cardJogador.type != "MINION"){
        $scope.descarteJogador.push(card);      
        $scope.maoJogador != $scope.maoJogador.splice(idCard,1); 
      }else{
        $scope.descarteJogador.push(card);
        $scope.mesaJogador != $scope.mesaJogador.splice(idCard,1);          
      }
    }

    $scope.jogarCard = function(idCard,card, mao, mesa, quantidade) {   
      if(cardJogador.type != "MINION"){
        $scope.descartarCard(idCard,card,$scope.descarteJogador, 1);  
        $scope.controlador.manaatual -= cardJogador.unidadesSolicitantes;   
      }
      else{
        $scope.mesaJogador.push(card);
        $scope.controlador.manaatual -= cardJogador.unidadesSolicitantes;   
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
      acoes = true;
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
      $scope.acoes = false;
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
      if(cardJogador.type != "MINION"){
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