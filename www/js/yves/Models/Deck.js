module.exports = function() {
    var Id
    var Name
    var User
    var Hero
    var Size
    var MaxSize
    var Cards = []
    var CurrentCards = []

    function DeckObj(id, name, user, hero, size, maxsize, cards, currentcards) {
        return {
            Id: id,
            Name: name,
            user: user,
            Hero: hero,
            Size: size,
            MaxSize: maxsize,
            Cards: cards,
            CurrentCards: currentcards
        }
    }
    this.Deck = function(id, name, user, hero, size, maxsize, cards, currentcards) {
        Id = id
        Name = name
        user = user
        Hero = hero
        Size = size
        MaxSize = maxsize
        Cards = cards
        CurrentCards = currentcards
    }
    this.setId = function(id) { Id = id }
    this.getId = function() { return Id }
    this.setName = function(name) { Name = name }
    this.getName = function() { return Name }
    this.setUser = function(user) { User = user }
    this.getUser = function() { return User }
    this.setHero = function(hero) { Hero = hero }
    this.getHero = function() { return Hero }
    this.setSize = function(size) { Size = size }
    this.getSize = function() { return Size }
    this.setMaxSize = function(size) { MaxSize = size }
    this.getMaxSize = function() { return MaxSize }
    this.setCards = function(cards) { Cards = cards }
    this.getCards = function() { return Cards }
    this.setCurrentCards = function(currentcards) { CurrentCards = currentcards }
    this.getCurrentCards = function() { return CurrentCards }

    this.addCard = function(card) {
        Cards.push(card)
        CurrentCards.push(card)
    }
    this.load = function(obj, deck) {
        var d = JSON.parse(deck)
        obj.Deck(d.Id, d.Name, d.User, d.Hero, d.Size, d.Maxsize, d.Cards, d.Currentcards)
        return obj
    }
    this.save = function() {
        var deck = JSON.stringify(DeckObj(Id, Name, User, Hero, Size, MaxSize, Cards, CurrentCards))
        return deck
    }
    this.removeCard = function(card) {
        for (var i = Cards.length - 1; i >= 0; i--) {
            if (Cards[i] === card) {
                Cards.splice(i, 1)
                break
            }
        }
        this.CurrentCards = Cards
    }
}