//HTML Programming Setup
const cmdprompt = document.querySelector("#command-prompt");
const cmdbut = document.querySelector("#command-submit");

cmdbut.addEventListener("click", cmdSubmit);
cmdprompt.addEventListener("keydown", promptKey);




//Game Programming Setup
let char = {
    "health": 100,
    "block": 0,
    "energy": 3,
    "max energy": 3,
    "strength": 0,
    "dexterity": 0,
    "frail": 0,
    "weak": 0,
    "dmgMod": 1,
    "blkMod": 1,  
}

let enemy = {
    "health": 100,
    "block": 0,
    "strength": 0,
    "dexterity": 0,
    "frail": 0,
    "weak": 0
}

let cardClass = {
    "name": "Strike",
    "cost": 1,
    "damage": 5,
    "block": 0,
    "effects": {},
    "decription": "this is a card!"
}

let StrikeCard = {
    "name": "Strike",
    "cost": 1,
    "damage": 5,
    "block": 0,
    "effects": {},
    "decription": `Deal ${(this.damage + char.strength) * char.dmgMod} damage`
}

let DefendCard = {
    "name": "Strike",
    "cost": 1,
    "damage": 0,
    "block": 5,
    "effects": {},
    "decription": `Gain ${(this.damage + char.dexterity) * char.blkMod} block`
}

let gameState = "player"

let hand = []



function promptKey(event){
    if (event.key === "Enter") {
        cmdSubmit(event)
    }
}


function cmdSubmit(event) {
    console.log("hit a button!")
    const prompt = cmdprompt.value
    if (prompt.startsWith("play") || prompt.startsWith("Play")) {
        playerPlay(prompt)
    } else if (prompt == "End turn" || prompt == "End Turn" || prompt == "end turn" || prompt == "end Turn") {
        playerEndTurn()
    } 
}

function playerPlay(prompt){
    cmdprompt.value = ""
    //alert("whooo")
}

function playerEndTurn(){
    cmdprompt.value = ""
    //alert("sad")
}

