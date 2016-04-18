//Card object Model
module.exports = function() {
    var Id
    var Name
    var Type
    var Description
    var Cost
    var BaseAttack
    var BaseDefense
    var BaseEffect
    var MaxAttack
    var MaxDefense
    var CurrentAttack
    var CurrentDefense
    var CurrentEffect
    var FrontImage
    var BackImage
    var Status = []

    //Setters
    function CardObj(id, name, type, description, cost, baseAttack, baseDefense, baseEffect, maxAttack, maxDefense, currentAttack, currentDefense, currentEffect, frontImage, backImage, status) {
        return {
            Id: id,
            Name: name,
            Type: type,
            Description: description,
            Cost: cost,
            BaseAttack: baseAttack,
            BaseDefense: baseDefense,
            BaseEffect: baseEffect,
            MaxAttack: maxAttack,
            MaxDefense: maxDefense,
            CurrentAttack: currentAttack,
            CurrentDefense: currentDefense,
            CurrentEffect: currentEffect,
            FrontImage: frontImage,
            BackImage: backImage,
            Status: status
        }
    }
    this.Card = function(id, name, type, description, cost, baseAttack, baseDefense, baseEffect, maxAttack, maxDefense, currentAttack, currentDefense, currentEffect, frontImage, backImage, status) {
        Id = id
        Name = name
        Type = type
        Description = description
        Cost = cost
        BaseAttack = baseAttack
        BaseDefense = baseDefense
        BaseEffect = baseEffect
        MaxAttack = maxAttack
        MaxDefense = maxDefense
        CurrentAttack = currentAttack
        CurrentDefense = currentDefense
        CurrentEffect = currentEffect
        FrontImage = frontImage
        BackImage = backImage
        Status = status
    }
    this.setId = function(id) {
        Id = id
    }
    this.getId = function() {
        return Id
    }
    this.setName = function(name) {
        Name = name
    }
    this.getName = function() {
        return Name
    }
    this.setType = function(type) {
        Type = type
    }
    this.getType = function() {
        return Type
    }
    this.setDescription = function(description) {
        Description = description
    }
    this.getDescription = function() {
        return Description
    }
    this.setCost = function(cost) {
        Cost = cost
    }
    this.getCost = function() {
        return Cost
    }
    this.setBaseAttack = function(baseattack) {
        BaseAttack = baseattack
    }
    this.getBaseAttack = function() {
        return BaseAttack
    }
    this.setBaseDefense = function(basedefence) {
        Basedefence = basedefence
    }
    this.getBaseDefense = function() {
        return Basedefence
    }
    this.setBaseEffect = function(baseefect) {
        BaseEffect = baseefect
    }
    this.getBaseEffect = function() {
        return BaseEffect
    }
    this.setMaxAttack = function(maxattack) {
        MaxAttack = maxattack
    }
    this.getMaxAttack = function() {
        return MaxAttack
    }
    this.setMaxDefense = function(maxdefense) {
        Maxdefense = maxdefense
    }
    this.getMaxDefense = function() {
        return Maxdefense
    }
    this.setCurrentAttack = function(currentattack) {
        CurrentAttack = currentattack
    }
    this.getCurrentAttack = function() {
        return CurrentAttack
    }
    this.setCurrentDefense = function(currentdefense) {
        CurrentDefense = currentdefense
    }
    this.getCurrentDefense = function() {
        return CurrentDefense
    }
    this.setCurrentEffect = function(currenteffect) {
        CurrentEffect = currenteffect
    }
    this.getCurrentEffect = function() {
        return CurrentEffect
    }
    this.setFrontImage = function(frontimage) {
        FrontImage = frontimage
    }
    this.getFrontImage = function() {
        return FrontImage
    }
    this.setBackImage = function(backimage) {
        BackImage = backimage
    }
    this.getBackImage = function() {
        return BackImage
    }
    this.addStatus = function(status) {
        Status.push(status)
    }
    this.removeStatus = function(status) {
        for (var i = Status.length - 1; i >= 0; i--) {
            if (Status[i] === status) {
                Status.splice(i, 1)
            }
        }
    }
    this.load = function(obj, card) {
        var c = JSON.parse(card)
        obj.Card(c.Id, c.Name, c.Type, c.Description, c.Cost, c.BaseAttack, c.BaseDefense, c.BaseEffect, c.MaxAttack, c.MaxDefense, c.CurrentAttack, c.CurrentDefense, c.CurrentEffect, c.FrontImage, c.BackImage, c.Status)
    }
    this.save = function() {
        var card = JSON.stringify(CardObj(Id, Name, Type, Description, Cost, BaseAttack, BaseDefense, BaseEffect, MaxAttack, MaxDefense, CurrentAttack, CurrentDefense, CurrentEffect, FrontImage, BackImage, Status))
        return card
    }
}