obj = require('../Models/User.js')

var user1 = obj

user1.setId(1)
user1.setName("Aramat")
user1.setEmail("Aramat@Aramat.com")
user1.setCards([1,2,3,4,5,6])
user1.setDecks([[1,2,3],[2,1,4,5],[6,5,4]])
user1.setHeroes([1,5,3])
console.log(user1)

user1.addCard(7)
user1.addDeck([7,6,5,4,3,2,1])
user1.addHero(2)
user1.addHero(4)
console.log(user1)

user1.removeCard(4)
user1.removeDeck([6,5,4])
user1.removeHero(3)
console.log(user1)

user1.save()


