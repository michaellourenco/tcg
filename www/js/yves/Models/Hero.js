//Hero Object Model
module.exports = function() {
    var Id
    var Name
    var Type
    var Description
    var BaseAttack
    var BaseDefense
    var MaxAttack
    var MaxDefense
    var CurrentAttack
    var CurrentDefense
    var FrontImage
    var Hability
    var BaseHealth
    var MaxHealth
    var CurrentHealth
    //Setters
    function HeroObj(id, name, type, description, baseattack, basedefence, maxattack, maxdefense, currentattack, currentdefense, frontimage, hability, basehealth, maxhealth, currenthealth) {
        return {
            Id: id,
            Name: name,
            Type: type,
            Description: description,
            BaseAttack: baseattack,
            BaseDefense: basedefence,
            MaxAttack: maxattack,
            MaxDefense: maxdefense,
            CurrentAttack: currentattack,
            CurrentDefense: currentdefense,
            FrontImage: frontimage,
            Hability: hability,
            BaseHealth: basehealth,
            MaxHealth: maxhealth,
            CurrentHealth: currenthealth
        }
    }
    this.Hero = function(id, name, type, description, baseattack, basedefence, maxattack, maxdefense, currentattack, currentdefense, frontimage, hability, basehealth, maxhealth, currenthealth) {
        Id = id
        Name = name
        Type = type
        Description = description
        BaseAttack = baseattack
        BaseDefense = basedefence
        MaxAttack = maxattack
        MaxDefense = maxdefense
        CurrentAttack = currentattack
        CurrentDefense = currentdefense
        FrontImage = frontimage
        Hability = hability
        BaseHealth = basehealth
        MaxHealth = maxhealth
        CurrentHealth = currenthealth
    }
    //
    //Getters and Setters
    //
    this.setId = function(id) { Id = id }
    this.getId = function() { return Id }
    this.setName = function(name) { Name = name }
    this.getName = function() { return Name }
    this.setType = function(type) { Type = type }
    this.getType = function() { return Type }
    this.setDescription = function(description) { Description = description }
    this.getDescription = function() { return Description }
    this.setCost = function(cost) { Cost = cost }
    this.getCost = function() { return Cost }
    this.setBaseAttack = function(baseattack) { BaseAttack = baseattack }
    this.getBaseAttack = function() { return BaseAttack }
    this.setBaseDefense = function(basedefence) { basedefence = basedefence }
    this.getBaseDefense = function() { return basedefence }
    this.setMaxAttack = function(maxattack) { MaxAttack = maxattack }
    this.getMaxAttack = function() { return MaxAttack }
    this.setMaxDefense = function(maxdefense) { maxdefense = maxdefense }
    this.getMaxDefense = function() { return maxdefense }
    this.setCurrentAttack = function(currentattack) { CurrentAttack = currentattack }
    this.getCurrentAttack = function() { return CurrentAttack }
    this.setCurrentDefense = function(currentdefense) { CurrentDefense = currentdefense }
    this.getCurrentDefense = function() { return CurrentDefense }
    this.setFrontImage = function(frontimage) { FrontImage = frontimage }
    this.getFrontImage = function() { return FrontImage }
    this.setHability = function(hability) { Hability = hability }
    this.getHability = function() { return Hability }
    this.setBaseHealth = function(basehealth) { BaseHealth = basehealth }
    this.getBaseHealth = function() { return BaseHealth }
    this.setMaxHealth = function(maxhealth) { MaxHealth = maxhealth }
    this.getMaxHealth = function() { return MaxHealth }
    this.setCurrentHealth = function(currenthealth) { CurrentHealth = currenthealth }
    this.getCurrentHealth = function() { return CurrentHealth }
    
    //
    //Methods
    //
    this.load = function(obj, hero) {
        var h = JSON.parse(hero)
        obj.Hero(h.Id, h.Name, h.Type, h.Description, h.Baseattack, h.Basedefence, h.Maxattack, h.Maxdefense, h.Currentattack, h.Currentdefense, h.Frontimage, h.Hability, h.Basehealth, h.Maxhealth, h.Currenthealth)
    }
    this.save = function() {
        var user = JSON.stringify(HeroObj(Id, Name, Type, Description, BaseAttack, BaseDefense, MaxAttack, MaxDefense, CurrentAttack, CurrentDefense, FrontImage, Hability, BaseHealth, MaxHealth, CurrentHealth))
        return user
    }
}