let roleMiner = require('role.miner');
let roleRunner = require('role.runner')
let structSpawner = require('struct.spawner')


function clearDead()
{
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}

function creepExec()
{
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'runner') {
            roleRunner.run(creep);
        }
    }
}

function currRoom()
{
    return Game.spawns["F JAVASCRIPT"].room
}

function construction()
{
    currRoom().createConstructionSite(Game.spawns["F JAVASCRIPT"].pos.x+-1+Math.floor(Math.random() * 3), Game.spawns["F JAVASCRIPT"].pos.x+-1+Math.floor(Math.random() * 3), STRUCTURE_EXTENSION)
}

module.exports.loop = function () {
    clearDead();
    construction();
    structSpawner.run()
    creepExec();
}