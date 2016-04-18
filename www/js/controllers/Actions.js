//'use strict';

angular
  .module('app.actions', ['angularFileUpload','ngAnimate'])
.controller('ActionsCtrl', ['$scope','$interval', 'FileUploader','$http','$ionicModal', '$timeout', '$stateParams','$location','$log','$templateCache','combatesAPI','dadoAPI','charAPI', function($scope,$interval, FileUploader,$http, $ionicModal, $timeout, $stateParams,$location,$log,$templateCache,combatesAPI,dadoAPI,charAPI) {
      $templateCache.removeAll();

//Creates an attack from source to target.
Attack(source, target);


//Begins a turn for player.
BeginTurn(player);

//Moves target to Zone.GRAVEYARD and queues its deathrattles.
Death(target);

//Ends player's turn.
EndTurn(player);


//Plays card card, on target target if specified. Chooses the action from choose if specified.
Play(card, target, choose);

//Targeted Actions

//Buff characters with Enchantment id.
Buff(targets, id);

//Move a minion on the field back into the hand. Note: Safely usable on weapons, but untested.
Bounce(targets);


//Counters target cards, setting GameTag.CANT_PLAY which prevents the on-play script from running. This is only used for Counterspell.
Counter(targets);

Damage(targets, amount);

//Damage characters by amount. The event will not broadcast if the final amount (after armor) is 0.

Deathrattle(targets);

//Trigger all deathrattles on the targets. This takes EXTRA_DEATHRATTLES (Baron Rivendare) into account.

Destroy(targets);

//Destroy characters.

//*Note: Do not use this as an event listener, unless you specifically want to trigger when a character is *destroyed (eg. by an effect). Use the Death() Game Action instead.

Discard(targets);

//Discard targeted cards in hand.

Draw(targets);

//Draws one card for the targets from the top of their deck.

//*Note: If you want to draw more than one card, use action multipliers. (eg. Draw(CONTROLLER) * 2)

ForceDraw(targets, match);

//Make the targets draw all cards matching the match selector from their deck. Note: This will not trigger the Draw() event.

FullHeal(targets);

//Helper action to call Heal() on the character targets, for an amount equal to their max health.

GainArmor(targets, amount);

//Make hero targets gain amount armor. Do not use on anything else than heroes.

GainMana(targets, amount);

//Make player targets gain amount mana. Note: amount can be negative to cause them to lose mana.

Give(targets, card);

//Give player targets card. The card argument is an Evaluated Card (see above)

Hit(targets, amount, source);

//Cause a hit on targets for amount. Optionally sets the hit source as source (eg. Betrayal)

Heal(targets, amount);

//Heal targets for amount. The event will not broadcast if the final amount is 0.

ManaThisTurn(targets, amount);

//Give player targets amount temporary mana.

Mill(targets, count);

//Mills count cards from the targets' decks.

Morph(targets, card);

//Morph minion targets into card. card is an Evaluated Card (see above).

Freeze(targets);

//Freezes character targets.

FillMana(targets, amount);

//Refills amount mana crystals for the player targets.

Reveal(targets);

//Reveals and destroys targeted Secret cards.

SetTag(targets, values);

//Sets tags on targets following the values dict argument. For example, SetTag(TARGET, {GameTag.TAUNT: True, GameTag.WINDFURY: False}) will set TAUNT and unset WINDFURY.

Silence(targets);

//Silences minion targets.

Summon(targets, card);

//Summons card for each target. This can be used to summon a Minion, Hero, HeroPower, or equip a Weapon. card is an Evaluated Card (see above). Note that if card is a selector, the card is directly summoned from where it currently is (eg "force played").

Shuffle(targets, card);

//Shuffles card for each target. card is an Evaluated Card (see above).

Steal(targets);

//Give control of the targets to the controller of the source of the action.

UnlockOverload(targets);

//Unlock the overload (both locked and owed) on the targets. Targets must be players.



}]);