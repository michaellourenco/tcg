function efeito(){

//mapa
	divine_shield = prop(GameTag.DIVINE_SHIELD, bool)
	double_spelldamage_bonus = prop(GameTag.RECEIVES_DOUBLE_SPELLDAMAGE_BONUS, bool)
//
	// Tags

	atk = prop(GameTag.ATK)
	durability = prop(GameTag.DURABILITY)
	unidadesSolicitantes = prop(GameTag.COST)
	prefixoViatura = prop(GameTag.HEALTH)
	windfury = prop(GameTag.WINDFURY)

	//
	// Auto-guessed extras

	overload = prop(GameTag.OVERLOAD)
	heropower_damage = prop(GameTag.HEROPOWER_DAMAGE)
	spell_damage = GameTag.SPELLPOWER
}