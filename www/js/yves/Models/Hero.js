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
    function HeroObj(id, name, type, description, basenaturezaOperacao, basedefence, maxnaturezaOperacao, maxareaAtuacao, currentnaturezaOperacao, currentareaAtuacao, frontimage, hability, baseprefixoViatura, maxprefixoViatura, currentprefixoViatura) {
        return {
            Id: id,
            Name: name,
            Type: type,
            Description: description,
            BaseAttack: basenaturezaOperacao,
            BaseDefense: basedefence,
            MaxAttack: maxnaturezaOperacao,
            MaxDefense: maxareaAtuacao,
            CurrentAttack: currentnaturezaOperacao,
            CurrentDefense: currentareaAtuacao,
            FrontImage: frontimage,
            Hability: hability,
            BaseHealth: baseprefixoViatura,
            MaxHealth: maxprefixoViatura,
            CurrentHealth: currentprefixoViatura
        }
    }
    this.Hero = function(id, name, type, description, basenaturezaOperacao, basedefence, maxnaturezaOperacao, maxareaAtuacao, currentnaturezaOperacao, currentareaAtuacao, frontimage, hability, baseprefixoViatura, maxprefixoViatura, currentprefixoViatura) {
        Id = id
        Name = name
        Type = type
        Description = description
        BaseAttack = basenaturezaOperacao
        BaseDefense = basedefence
        MaxAttack = maxnaturezaOperacao
        MaxDefense = maxareaAtuacao
        CurrentAttack = currentnaturezaOperacao
        CurrentDefense = currentareaAtuacao
        FrontImage = frontimage
        Hability = hability
        BaseHealth = baseprefixoViatura
        MaxHealth = maxprefixoViatura
        CurrentHealth = currentprefixoViatura
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
    this.setCost = function(unidadesSolicitantes) { Cost = unidadesSolicitantes }
    this.getCost = function() { return Cost }
    this.setBaseAttack = function(basenaturezaOperacao) { BaseAttack = basenaturezaOperacao }
    this.getBaseAttack = function() { return BaseAttack }
    this.setBaseDefense = function(basedefence) { basedefence = basedefence }
    this.getBaseDefense = function() { return basedefence }
    this.setMaxAttack = function(maxnaturezaOperacao) { MaxAttack = maxnaturezaOperacao }
    this.getMaxAttack = function() { return MaxAttack }
    this.setMaxDefense = function(maxareaAtuacao) { maxareaAtuacao = maxareaAtuacao }
    this.getMaxDefense = function() { return maxareaAtuacao }
    this.setCurrentAttack = function(currentnaturezaOperacao) { CurrentAttack = currentnaturezaOperacao }
    this.getCurrentAttack = function() { return CurrentAttack }
    this.setCurrentDefense = function(currentareaAtuacao) { CurrentDefense = currentareaAtuacao }
    this.getCurrentDefense = function() { return CurrentDefense }
    this.setFrontImage = function(frontimage) { FrontImage = frontimage }
    this.getFrontImage = function() { return FrontImage }
    this.setHability = function(hability) { Hability = hability }
    this.getHability = function() { return Hability }
    this.setBaseHealth = function(baseprefixoViatura) { BaseHealth = baseprefixoViatura }
    this.getBaseHealth = function() { return BaseHealth }
    this.setMaxHealth = function(maxprefixoViatura) { MaxHealth = maxprefixoViatura }
    this.getMaxHealth = function() { return MaxHealth }
    this.setCurrentHealth = function(currentprefixoViatura) { CurrentHealth = currentprefixoViatura }
    this.getCurrentHealth = function() { return CurrentHealth }
    
    //
    //Methods
    //
    this.load = function(obj, hero) {
        var h = JSON.parse(hero)
        obj.Hero(h.Id, h.Name, h.Type, h.Description, h.BasenaturezaOperacao, h.Basedefence, h.MaxnaturezaOperacao, h.MaxareaAtuacao, h.CurrentnaturezaOperacao, h.CurrentareaAtuacao, h.Frontimage, h.Hability, h.BaseprefixoViatura, h.MaxprefixoViatura, h.CurrentprefixoViatura)
    }
    this.save = function() {
        var user = JSON.stringify(HeroObj(Id, Name, Type, Description, BaseAttack, BaseDefense, MaxAttack, MaxDefense, CurrentAttack, CurrentDefense, FrontImage, Hability, BaseHealth, MaxHealth, CurrentHealth))
        return user
    }
}