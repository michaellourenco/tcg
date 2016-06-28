//'use strict';

angular
.module('app.lutacnv2', ['angularFileUpload','ngAnimate'])
.controller('LutaCnv2Ctrl', 
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


//var canv = document.getElementById('board');
//var ctx = canv.getContext('2d');
//window.addEventListener("load", windowLoadHandler, false);



//function windowLoadHandler() {
  //canvasApp();
//}



function canvasApp() {

  
  var canv = document.getElementById("board");
  var ctx = canv.getContext("2d");
  
  init();
  
  var maJogador;
  var meJogador;
  var shapes;
  var dragIndex;
  var dragging;
  var mouseX;
  var mouseY;
  var dragHoldX;
  var dragHoldY;
  var timer;
  var targetX;
  var targetY;
  var easeAmount;
  var bgColor;
  
  function init() {
    //maJogador = 5;
    meJogador = 5;
    easeAmount = 0.20;
    
    bgColor = "#000000";
maJogador =[
  {
    "set": "EXPERT1",
    "id": "EX1_033",
    "name": "Harpia VentofÃºria",
    "naturezaOperacao": 4,
    "text": "<b>FÃºria dos Ventos</b>",
    "artist": "Luke Mancini",
    "prefixoViatura": 5,
    "flavor": "Harpias nÃ£o tÃªm uma voz bonita. Ã‰ o jeito mais educado de dizer.",
    "collectible": true,
    "faction": "ALLIANCE",
    "mechanics": [
      "WINDFURY"
    ],
    "texture": "W17_a066_D",
    "type": "MINION",
    "dust": [
      40,
      400,
      5,
      50
    ],
    "unidadesSolicitantes": 6,
    "rarity": "COMMON"
  },
  {
    "set": "BRM",
    "id": "BRM_002",
    "name": "Ardilante",
    "naturezaOperacao": 2,
    "artist": "Alex Horley Orlandelli",
    "howToEarn": "Desbloqueado apÃ³s a derrota de Vaelastrasz no Covil Asa Negra.",
    "prefixoViatura": 4,
    "flavor": "O negÃ³cio dos Ardilantes Ã© fazer arder; o dos FlamÃ­vagos, inflamar. NÃ£o Ã© porque as temperaturas sÃ£o altÃ­ssimas que Ã© tudo a mesma coisa.",
    "collectible": true,
    "rarity": "RARE",
    "playerClass": "MAGE",
    "texture": "W2_429_D",
    "type": "MINION",
    "howToEarnGolden": "Pode ser criado apÃ³s a derrota de Vaelastrasz no Covil Asa Negra.",
    "unidadesSolicitantes": 3,
    "text": "Depois de lanÃ§ar um feitiÃ§o, cause 2 de dano dividido aleatoriamente entre todos os inimigos."
  },
  {
    "set": "BRM",
    "id": "BRM_007",
    "name": "FormaÃ§Ã£o de Quadrilha",
    "artist": "Jim Nelson",
    "howToEarn": "Desbloqueado apÃ³s vencer a Arena Ferro Negro no Abismo Rocha Negra.",
    "playRequirements": {
      "REQ_MINION_TARGET": 0,
      "REQ_TARGET_TO_PLAY": 0
    },
    "flavor": "Se estiver pensando em visitar o Arroio da Lua, Ã© bom abrir o \"oio\".",
    "collectible": true,
    "rarity": "COMMON",
    "playerClass": "ROGUE",
    "texture": "W21_A040_D",
    "type": "SPELL",
    "howToEarnGolden": "Pode ser criado apÃ³s vencer a Arena Ferro Negro no Abismo Rocha Negra.",
    "unidadesSolicitantes": 2,
    "text": "Escolha um lacaio. Embaralhe 3 cÃ³pias dele no seu deck."
  },
  {
    "set": "CORE",
    "id": "CS2_094",
    "name": "Martelo da Ira",
    "artist": "Efrem Palacios",
    "howToEarn": "DisponÃ­vel no nÃ­vel 1.",
    "playRequirements": {
      "REQ_TARGET_TO_PLAY": 0
    },
    "flavor": "Um bom paladino tem muitas ferramentas. Martelo da Ira, Alicate da VinganÃ§a, Serrote da JustiÃ§a, etc.",
    "collectible": true,
    "rarity": "FREE",
    "playerClass": "PALADIN",
    "texture": "R6_a091_D",
    "type": "SPELL",
    "howToEarnGolden": "DisponÃ­vel no nÃ­vel 32.",
    "unidadesSolicitantes": 4,
    "text": "Cause $3 de dano.\nCompre um card."
  },
  {
    "set": "EXPERT1",
    "id": "EX1_561e",
    "name": "Chama de Alexstrasza",
    "texture": "R8_A002_D",
    "type": "ENCHANTMENT",
    "text": "PrefixoViatura definida para 15."
  },
  {
    "set": "TGT",
    "id": "AT_071",
    "name": "CampeÃ£ de Alexstrasza",
    "naturezaOperacao": 2,
    "artist": "Evgeniy Zagumennyy",
    "prefixoViatura": 3,
    "flavor": "\"Ponha mais espinhos nela. Mais, pode botar mais espinhos. VocÃª Ã© surdo ou o quÃª? Eu falei MAIS ESPINHOS!\" â€” Alexstrasza",
    "collectible": true,
    "rarity": "RARE",
    "playerClass": "WARRIOR",
    "mechanics": [
      "BATTLECRY"
    ],
    "texture": "HS5-041_D",
    "type": "MINION",
    "dust": [
      100,
      800,
      20,
      100
    ],
    "unidadesSolicitantes": 2,
    "text": "<b>Grito de Guerra:</b> Se vocÃª tiver um DragÃ£o na mÃ£o, receba +1 de Ataque e <b>Investida</b>."
  },
  {
    "set": "TGT",
    "id": "AT_067",
    "name": "Magnatauro Alfa",
    "naturezaOperacao": 5,
    "artist": "Alex Horley Orlandelli",
    "prefixoViatura": 3,
    "flavor": "Jogar com ele dÃ¡ acesso ao Magnatauro Beta.",
    "collectible": true,
    "rarity": "EPIC",
    "playerClass": "WARRIOR",
    "texture": "HS5-055_D",
    "type": "MINION",
    "dust": [
      400,
      1600,
      100,
      400
    ],
    "unidadesSolicitantes": 4,
    "text": "TambÃ©m causa dano aos lacaios adjacentes ao alvo\natacado."
  },
  {
    "set": "BRM",
    "id": "BRMA14_12",
    "rarity": "LEGENDARY",
    "name": "Magorja",
    "naturezaOperacao": 10,
    "text": "<b>Provocar</b>",
    "mechanics": [
      "TAUNT"
    ],
    "texture": "HS4-050_D",
    "type": "MINION",
    "unidadesSolicitantes": 5,
    "prefixoViatura": 2
  },
  {
    "textInPlay": "Imp Master",
    "set": "EXPERT1",
    "id": "EX1_597",
    "name": "Diabrete Mestre",
    "naturezaOperacao": 1,
    "artist": "Mark Gibbons",
    "prefixoViatura": 5,
    "flavor": "Ela gostaria mais do trabalho se conseguisse fazer com que os diabretes parem de mordÃª-la.",
    "collectible": true,
    "rarity": "RARE",
    "texture": "WOW_AWK_001_D",
    "type": "MINION",
    "dust": [
      100,
      800,
      20,
      100
    ],
    "unidadesSolicitantes": 3,
    "text": "No final do seu turno, cause 1 de dano a este lacaio e evoque um Diabrete 1/1."
  },
  {
    "set": "BRM",
    "id": "BRMA14_1",
    "name": "Sistema de Defesa Omnitron",
    "texture": "HS4-036_D",
    "type": "HERO",
    "prefixoViatura": 30
  },
  {
    "set": "GVG",
    "id": "GVG_047",
    "name": "Sabotagem",
    "artist": "Dave Allsop",
    "playRequirements": {
      "REQ_ENEMY_TARGET": 0,
      "REQ_MINION_TARGET": 0
    },
    "flavor": "Ladino nÃ£o deixa rastro, segue sÃ³ no sapatinho. Com ladino Ã© mais embaixo, enfia a faca de ladinho!",
    "collectible": true,
    "rarity": "EPIC",
    "playerClass": "ROGUE",
    "mechanics": [
      "COMBO"
    ],
    "texture": "W8_127_D",
    "type": "SPELL",
    "dust": [
      400,
      1600,
      100,
      400
    ],
    "unidadesSolicitantes": 4,
    "text": "Destrua um lacaio inimigo aleatÃ³rio. <b>Combo</b>: E a arma do seu oponente."
  },
  {
    "set": "EXPERT1",
    "id": "EX1_366e",
    "name": "JustiÃ§a Feita",
    "playerClass": "PALADIN",
    "texture": "W11_181(EA)_D",
    "type": "ENCHANTMENT",
    "text": "Tem +1/+1."
  },
  {
    "set": "NAXX",
    "id": "NAX7_03",
    "name": "Golpe Desequilibrante",
    "texture": "r5_090_D",
    "type": "HERO_POWER",
    "playRequirements": {
      "REQ_TARGET_TO_PLAY": 0
    },
    "unidadesSolicitantes": 2,
    "text": "<b>Poder Heroico</b>\nCause 3 de dano."
  },
  {
    "set": "CHEAT",
    "id": "XXX_030",
    "rarity": "COMMON",
    "name": "Opponent Disconnect",
    "texture": "W6_174_D",
    "type": "SPELL",
    "unidadesSolicitantes": 0,
    "text": "Force your opponnet to disconnect."
  },
  {
    "set": "EXPERT1",
    "id": "EX1_619",
    "name": "Igualdade",
    "artist": "Michal Ivan",
    "flavor": "Somos todos flocos de neve Ãºnicos... com 1 de PrefixoViatura.",
    "collectible": true,
    "rarity": "RARE",
    "playerClass": "PALADIN",
    "texture": "W14_a024_D",
    "type": "SPELL",
    "dust": [
      100,
      800,
      20,
      100
    ],
    "unidadesSolicitantes": 2,
    "text": "Mude a PrefixoViatura de TODOS os lacaios para 1."
  },
  {
    "set": "TGT",
    "id": "AT_071e",
    "name": "DÃ¡diva de Alexstrasza",
    "playerClass": "WARRIOR",
    "texture": "HS5-041_D",
    "type": "ENCHANTMENT",
    "text": "+1 de Ataque e <b>Investida</b>."
  },
  {
    "set": "NAXX",
    "id": "NAX13_03e",
    "name": "Supercarregado",
    "texture": "W12_a041(EA)_D",
    "type": "ENCHANTMENT",
    "text": "+2 de PrefixoViatura."
  },
  {
    "set": "GVG",
    "id": "GVG_032",
    "name": "Mantenedora do Bosque",
    "naturezaOperacao": 2,
    "artist": "Chris Rahn",
    "prefixoViatura": 4,
    "flavor": "Gosta de: fazer trilha e ficar ao ar livre. NÃ£o gosta de: retalhadores goblÃ­nicos e sandÃ¡lias (nenhuma cabe!).",
    "collectible": true,
    "rarity": "RARE",
    "playerClass": "DRUID",
    "texture": "W17_A211_D",
    "type": "MINION",
    "dust": [
      100,
      800,
      20,
      100
    ],
    "unidadesSolicitantes": 3,
    "text": "<b>Escolha Um -</b> Conceda um Cristal de UnidadesSolicitantes a cada jogador; ou Cada jogador compra um card."
  },
  {
    "set": "GVG",
    "id": "GVG_041c",
    "name": "Fogo EnfÃ¡tico",
    "playerClass": "DRUID",
    "texture": "W2_158_D",
    "type": "ENCHANTMENT",
    "text": "+5/+5 e <b>Provocar</b>."
  },
  {
    "set": "BRM",
    "id": "BRMA14_4H",
    "name": "Ativar Toxitron",
    "texture": "HS4-038_2_D",
    "type": "HERO_POWER",
    "unidadesSolicitantes": 2,
    "text": "<b>Poder Heroico</b>\nAtivar Toxitron!"
  },
  {
    "set": "TB",
    "id": "BRMC_98",
    "race": "DRAGON",
    "name": "ViolÃ¢minus",
    "naturezaOperacao": 4,
    "text": "No inÃ­cio do seu turno, conceda +3 de Ataque aos seus lacaios.",
    "rarity": "LEGENDARY",
    "texture": "HS4-011_2_D",
    "type": "MINION",
    "unidadesSolicitantes": 6,
    "prefixoViatura": 12
  },
  {
    "set": "BRM",
    "id": "BRMA16_3",
    "name": "Sopro SÃ´nico",
    "texture": "HS4-045_D",
    "type": "SPELL",
    "playRequirements": {
      "REQ_WEAPON_EQUIPPED": 0,
      "REQ_MINION_TARGET": 0,
      "REQ_TARGET_TO_PLAY": 0
    },
    "unidadesSolicitantes": 4,
    "text": "Cause $3 de dano a um lacaio. Concede +3 de Ataque Ã  sua arma."
  },
  {
    "set": "CORE",
    "id": "NEW1_034",
    "name": "Bufo",
    "race": "BEAST",
    "naturezaOperacao": 4,
    "prefixoViatura": 2,
    "rarity": "COMMON",
    "playerClass": "HUNTER",
    "mechanics": [
      "CHARGE"
    ],
    "texture": "W19_a206_D",
    "type": "MINION",
    "unidadesSolicitantes": 3,
    "text": "<b>Investida</b>"
  },
  {
    "set": "CORE",
    "id": "CS2_023",
    "name": "Intelecto Arcano",
    "artist": "Dave Berggren",
    "howToEarn": "DisponÃ­vel no nÃ­vel 1.",
    "flavor": "Jogar esse card deixa vocÃª mais ESPERTO. E, vamos concordar: vocÃª anda precisando, nÃ©?",
    "collectible": true,
    "rarity": "FREE",
    "playerClass": "MAGE",
    "texture": "WOW_ACT_078_D",
    "type": "SPELL",
    "howToEarnGolden": "DisponÃ­vel no nÃ­vel 15.",
    "unidadesSolicitantes": 3,
    "text": "Compre 2 cards."
  }];    
    shapes = [];
    shapes2 = [];
    
    makeShapes();
    
    drawScreen();
    
    canv.addEventListener("mousedown", mouseDownListener, false);
  }
  
  function makeShapes() {
    var i;
    var tempX;
    var tempY;
    var tempRad;
    var r1;
    var g1;
    var b1;
    var color1;
    var r2;
    var g2;
    var b2;
    var color2;
    var tempGrad;
    var gradFactor = 2;
    var posicaoX=100;
    var posicaoY= 100;
    for (i=0; i < 5; i++) {
      tempRad = 50;
      //randomized position
      posicaoX =posicaoX + 110;
      tempX = posicaoX;
      tempY = canv.height - posicaoY;
      
      //Randomize the color gradient. We will select a random color and set the center of the gradient to white.
      //We will only allow the color components to be as large as 200 (rather than the max 255) to create darker colors.
      r1 = Math.floor(Math.random()*200);
      g1 = Math.floor(Math.random()*200);
      b1 = Math.floor(Math.random()*200);
      color1 = "rgb(" + r1 + "," + g1 + "," + b1 +")";
      
      r2 = Math.min(Math.floor(gradFactor*r1),255);
      g2 = Math.min(Math.floor(gradFactor*g1),255);
      b2 = Math.min(Math.floor(gradFactor*b1),255);
      color2 = "rgb(" + r2 + "," + g2 + "," + b2 +")";
            
      tempShape = {x:tempX, 
                  y:tempY, 
                  rad:tempRad, 
                  gradColor1:color1, 
                  gradColor2:color2,
                  name:maJogador[i].name,
                  unidadesSolicitantes:maJogador[i].unidadesSolicitantes,
                  naturezaOperacao:maJogador[i].naturezaOperacao,
                  prefixoViatura:maJogador[i].prefixoViatura,
                  type:maJogador[i].type};
      shapes.push(tempShape);
    }

  }
  
  function mouseDownListener(evt) {
    var i;
    
    //getting mouse position correctly 
    var bRect = canv.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left)*(canv.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(canv.height/bRect.height);
        
    //find which shape was clicked
    for (i=0; i < shapes.length-1; i++) {
      if  (hitTest(shapes[i], mouseX, mouseY)) {
        if(shapes[i].type == "MINION"){
          dragging = true;
          //the following variable will be reset if this loop repeats with another successful hit:
          dragIndex = i;
        }else{
          console.info("nao eh minion","não é minion");
        }
      }
    }
    
    if (dragging) {
      window.addEventListener("mousemove", mouseMoveListener, false);
      
      //We now place the currently dragged shape on top by reordering the array which holds these objects.
      //We 'splice' out this array element, then 'push' it back into the array at the end.
      shapes.push(shapes.splice(dragIndex,1)[0]);
      
      //shape to drag is now last one in array. We read record the point on this object where the mouse is "holding" it:
      dragHoldX = mouseX - shapes[shapes.length-1].x;
      dragHoldY = mouseY - shapes[shapes.length-1].y;
      
      //The "target" position is where the object should be if it were to move there instantaneously. But we will
      //set up the code so that this target position is approached gradually, producing a smooth motion.
      targetX = mouseX - dragHoldX;
      targetY = mouseY - dragHoldY;
      
      //start timer
      timer = setInterval(onTimerTick, 1000/30);
    }
    canv.removeEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);
    
    //code below prevents the mouse down from having an effect on the main browser window:
    if (evt.preventDefault) {
      evt.preventDefault();
    } //standard
    else if (evt.returnValue) {
      evt.returnValue = false;
    } //older IE
    return false;
  }
  
  function onTimerTick() {
    /*
    Because of reordering, the dragging shape is the last one in the array.
    The code below moves this shape only a portion of the distance towards the current "target" position, and 
    because this code is being executed inside a function called by a timer, the object will continue to
    move closer and closer to the target position.
    The amount to move towards the target position is set in the parameter 'easeAmount', which should range between
    0 and 1. The target position is set by the mouse position as it is dragging.    
    */
    shapes[shapes.length-1].x = shapes[shapes.length-1].x + easeAmount*(targetX - shapes[shapes.length-1].x);
    shapes[shapes.length-1].y = shapes[shapes.length-1].y + easeAmount*(targetY - shapes[shapes.length-1].y);
    
    //stop the timer when the target position is reached (close enough)
    if ((!dragging)&&(Math.abs(shapes[shapes.length-1].x - targetX) < 0.1) && (Math.abs(shapes[shapes.length-1].y - targetY) < 0.1)) {
      shapes[shapes.length-1].x = targetX;
      shapes[shapes.length-1].y = targetY;
      //stop timer:
      clearInterval(timer);
    }
    drawScreen();
  }
  
  function mouseUpListener(evt) {
    canv.addEventListener("mousedown", mouseDownListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    if (dragging) {
      dragging = false;
      window.removeEventListener("mousemove", mouseMoveListener, false);
    }
  }

  function mouseMoveListener(evt) {
    var posX;
    var posY;
    var shapeRad = shapes[shapes.length-1].rad;
    var minX = shapeRad;
    var maxX = canv.width - shapeRad;
    var minY = shapeRad;
    var maxY = canv.height - shapeRad;
    //getting mouse position correctly 
    var bRect = canv.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left)*(canv.width/bRect.width);
    mouseY = (evt.clientY - bRect.top)*(canv.height/bRect.height);
    
    //clamp x and y positions to prevent object from dragging outside of canvas
    posX = mouseX - dragHoldX;
    posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
    posY = mouseY - dragHoldY;
    posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
    
    targetX = posX;
    targetY = posY;
  }
  
  function hitTest(shape,mx,my) {
    
    var dx;
    var dy;
    dx = mx - shape.x;
    dy = my - shape.y;
    
    return (dx*dx + dy*dy < shape.rad*shape.rad);
  }
  
  function drawShapes() {
   var novamesa = new Board(shapes,canv,ctx);
   novamesa.desenharCards();

  }
  
  function drawScreen() {
    //bg
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canv.width,canv.height);
    
    drawShapes();   
  } 
}

canvasApp();
  

  var update = function(){
 
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
           // console.info('novojogador', $scope.deckJogador);
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

       // console.info("meudeck", $scope.deckJogador);
 
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