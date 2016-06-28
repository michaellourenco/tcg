var Board = function(cards,canv,ctx){
	this.cards=cards;
	this.canv =canv;
	this.ctx=ctx;
}
Board.prototype.criarCards = function(posicaoX,posicaoY ){
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
    for (i=0; i < this.cards.lenght; i++) {
      tempRad = 50;
      //randomized position
      posicaoX =posicaoX + 150;
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
      				name:cards[i].name,
      				unidadesSolicitantes:cards[i].unidadesSolicitantes,
      				naturezaOperacao:cards[i].naturezaOperacao,
      				prefixoViatura:cards[i].prefixoViatura
      				};
      this.cards[i].push(tempShape);
    }
}
Board.prototype.desenharCard = function(card){
    //define gradient
    console.log("desenhando uma carta");
    var grad;
    var x;
    var y;
    var rad;
	rad = card.rad;
	x = card.x;
	y = card.y;
	grad = card.grad = this.ctx.createRadialGradient(x-0.33*rad, y-0.33*rad, 0, x-0.33*rad, y-0.33*rad, 1.33*rad);
	grad.addColorStop(0,card.gradColor2);
	grad.addColorStop(1,card.gradColor1);

	this.ctx.fillStyle = grad;

	this.ctx.fillRect(x -rad, y - rad, 2*rad, 2*rad);
	this.ctx.fillStyle = "#fff";
	this.ctx.font = "12px Arial";
	this.ctx.fillText(card.unidadesSolicitantes,x -rad + 2,  y-15,80);
	this.ctx.fillText(card.name,x -rad + 2,  y+15,80);
	this.ctx.fillText(card.naturezaOperacao,x -rad + 2,  y+25,30);
	this.ctx.fillText(card.prefixoViatura,x + 2,  y+25,30);
	this.ctx.closePath();
	this.ctx.fill();

	// this.ctx.beginPath();
	// this.ctx.arc(x, y, rad, 0, 2*Math.PI, false);
	// this.ctx.closePath();
	//this.ctx.fill();
}
Board.prototype.desenharCards = function(){
	var i;
	//console.log(Object.keys(this.cards).length);
    for (i=0; i < Object.keys(this.cards).length; i++) {
      //define gradient
      this.desenharCard(this.cards[i]);
   // console.log(this.cards);
    }
    var shapes= this.cards;
    return shapes;

}
