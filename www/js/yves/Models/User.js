
module.exports = function() {
    var equals = require('array-equal')

    var Id
    var Name
    var Email
    var Cards = []
    var Decks = []
    var Heroes = []

    function UserObj(id, name, email, cards, decks, heroes) {
        return {
            Id: id,
            Name: name,
            Email: email,
            Cards: cards,
            Decks: decks,
            Heroes: heroes
        }
    }
    this.User = function(id, name, email, cards, decks, heroes) {
        Id = id
        Name = name
        Email = email
        Cards = cards
        Decks = decks
        Heroes = heroes
    }
    this.setId = function(id) { Id = id }
    this.getId = function() { return Id }
    this.setName = function(name) { Name = name }
    this.getName = function() { return Name }
    this.setEmail = function(email) { Email = email }
    this.getEmail = function() { return Email }
    this.setCards = function(cards) { Cards = cards }
    this.getCards = function() { return Cards }
    this.setDecks = function(decks) { Decks = decks }
    this.getDecks = function() { return Decks }
    this.setHeroes = function(heroes) { Heroes = heroes }
    this.getHeroes = function() { return Heroes }
    
    this.addCard = function(card) {
        Cards.push(card)
    }
    this.addDeck = function(deck) {
        Decks.push(deck)
    }
    this.addHero = function(hero) {
        Heroes.push(hero)
    }
    this.removeCard = function(card) {
        for (var i = Cards.length - 1; i >= 0; i--) {
            if (Cards[i] === card) {
                Cards.splice(i, 1)
                break
            }
        }
    }
    this.removeDeck = function(deck) {
        for (var i = Decks.length - 1; i >= 0; i--) {
            if (equals(Decks[i], deck)) {
                Decks.splice(i, 1)
                break
            }
        }
    }
    this.removeHero = function(hero) {
        for (var i = Heroes.length - 1; i >= 0; i--) {
            if (Heroes[i] === hero) {
                Heroes.splice(i, 1)
                break
            }
        }
    }
    this.load = function(obj, user) {
        var u = JSON.parse(user)
        obj.User(u.Id, u.Name, u.Email, u.Cards, u.Decks, u.Heroes)
        return obj
    }
    this.save = function() {
        return JSON.stringify(UserObj(Id, Name, Email, Cards, Decks, Heroes))
    }
}