function acao{

var atualizaStatus 	=function(){};

var iniciaContador 	=function(){};

var liberarAcoes 	=function(){};

var jogarCard		=function(){};
var descartarCard	=function(){};
var comprarCard		=function(){};

var moverCard		=function(parametros){};
	
var inicioTurno 	=function(){
	this.comprarCard();
	this.atualizaStatus();
	this.acoesTurno(usuario);
};

var acoesTurno		=function(){
	this.iniciaContador();
	this.liberarAcoes();
	this.fimTurno(usuario);
};

var fimTurno		=function(){
	this.atualizaStatus();
	this.inicioTurno(adversario);
};	

//acoes
	// Enums

	card_class = prop(GameTag.CLASS, CardClass)
	card_set = prop(GameTag.CARD_SET, CardSet)
	faction = prop(GameTag.FACTION, Faction)
	race = prop(GameTag.CARDRACE, Race)
	rarity = prop(GameTag.RARITY, Rarity)
	type = prop(GameTag.CARDTYPE, CardType)

	//
	// Bools

	battlecry = prop(GameTag.BATTLECRY, bool)
	deathrattle = prop(GameTag.DEATHRATTLE, bool)
	inspire = prop(GameTag.INSPIRE, bool)
	poisonous = prop(GameTag.POISONOUS, bool)
	ritual = prop(GameTag.RITUAL, bool)
	secret = prop(GameTag.SECRET, bool)
	taunt = prop(GameTag.TAUNT, bool)
	spare_part = prop(GameTag.SPARE_PART, bool)
	topdeck = prop(GameTag.TOPDECK, bool)

	
}