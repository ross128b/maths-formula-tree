var tiu=0
var u15=0
addLayer("u",{
    name: "upgrade", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        //part1
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "lime",
    resource: "upgrade", // Name of prestige currency
    requires: new OmegaNum(10).pow(308), // Can be a function that takes requirement increases into account
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05,
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    row: 1,
    upgrades: {
        11:{
            title:"buff or debuff",
            cost: new OmegaNum(10),
            description:"points gain x|2-log(points+1)|"+"<br>"+"+10^-8 and unlock 10 points hardcap",
            effect(){
                var eff=player.points
                if(player.points.lt(99))return new OmegaNum(2).minus(eff.add(1).log().div(2.302585092994))
                if(player.points.gte(99))return new OmegaNum(eff.add(1).log().div(2.302585092994)).minus(2)
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            canAfford(){return player.points.gte(10)},
            pay(){player.points = player.points.minus(10)},
            unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
        },
        12: {
            title:"too slow!",
            cost:new OmegaNum(20),
            description:"triple points gain",
            canAfford(){return player.points.gte(20)},
            pay(){player.points = player.points.minus(20)},
            unlocked() { return (hasUpgrade(this.layer, 11))},
        },
        13: {
            title:"still too slow",
            cost:new OmegaNum(50),
            description:"get a buff base on your time",
            canAfford(){return player.points.gte(50)},
            pay(){player.points = player.points.minus(50)},
            effect(){
                if(!hasUpgrade("u",14))return player.t.points.pow(0.25)
                if(hasUpgrade("u",14))return player.t.points.pow(new OmegaNum(0.25).add(player.t.points.log().div(230.2585092994)))
            },
            effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
            unlocked() { return ( hasUpgrade(this.layer, 12))},
        },
        14:{
        	title:"u13 is not strong enough(it cost 98.99 points)",
        	cost:new OmegaNum(98.99),
        	description:"u13 0.25->0.25+log(t)",
        	canAfford(){return player.points.gte(98.99)},
        	unlocked() { return (hasUpgrade(this.layer, 13))},
        	pay(){
                player.points = player.points.minus(98.99)
                u15=player.t.points
            },


        },
	    15:{
		 title:"sin!",
		 cost:new OmegaNum(250),
		 description:"points x ln(t)*|sin(ln(t))|",
		 canAfford(){return player.points.gte(250)},
         pay(){player.points=player.points.minus(250)},
		 unlocked(){return(hasUpgrade(this.layer,14))},
		 effect(){
            var eff15 = new OmegaNum(0)
			eff15 = (Math.sin(player.t.points.log().mod(88).add(1).div(57.29577951472))*player.t.points.log()+1)
            return eff15
			 
		 },
         effectDisplay() { return format(this.effect())+"x" },
	    },
        21:{
            title:"don't wait too long",
            cost:new OmegaNum(1000),
            description:"WIP",
            canAfford(){return player.points.gte(1000)},
            pay(){player.points=player.points.minus(1000)},
        },
    },
    milestones: {
        0: {
            requirementDescription: "tips1",
            done() {return player[this.layer].best.gte(0)}, // Used to determine when to give the milestone
            effectDescription:"most of the upgrade in this layer need points instead of upgrade points to buy"
        },
    },
})
addLayer("t",{
    name:"time",
    symbol:"t",
    position: 0,
    startData() { return {
        //part1
        unlocked: false,
        points: new ExpantaNum(0),
    }},
    color: "green",
    resource: "time", // Name of prestige currency
    requires: new OmegaNum(10), // Can be a function that takes requirement increases into account
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0,
    base: 10,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    passiveGeneration(){
        return 1
    },
    row: 1,
})
