let structSpawner = 
{
    run : function()
    {
        // need append later.
        let roleData =
        {
            "miner" : { build : [MOVE,CARRY,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK], namePrefix : "⛏️" },
            "runner": { build : [MOVE,MOVE,CARRY,WORK,MOVE,CARRY,WORK,MOVE,CARRY,WORK], namePrefix : "🏃"}
        }
        
        function currRoom()
        {
            return Game.spawns["F JAVASCRIPT"].room
        }

        function bodyCost(ary)
        {
            return _.sum(ary, b => BODYPART_COST[b]);
        }

        function nextName(prefix, count)
        {
            let n = prefix + "😩".repeat(count)
            if(_.filter(Game.creeps, (creep) => creep.name == n).length >= 1)
            {
                return nextName(prefix, count+1)
            }
            return n
        }

        function creepsOfType(srole)
        {
            return _.filter(Game.creeps, (creep) => creep.memory.role == srole);
        }

        function spawnRole(srole)
        {
            let role = []
            while(bodyCost(role) <= currRoom().energyAvailable)
            {
                role.push(roleData[srole]["build"][role.length])
            }
            role.pop()
            console.log(role)
            
            return Game.spawns["F JAVASCRIPT"].spawnCreep(role, nextName(roleData[srole]["namePrefix"],1), {memory: {role: srole}});
        }

        function doSpawns()
        {
            // don't waste time with crappy creeps
            if(currRoom().energyAvailable < 300)
            {
                return
            }
            if((creepsOfType("miner").length <= creepsOfType("runner").length) && creepsOfType("miner").length < 3)
            {
                return spawnRole("miner")
            }
            else if (creepsOfType("runner").length < 6)
            {
                return spawnRole("runner")
            }
            return 0
        }
        
        console.log(doSpawns())
    }
}

module.exports = structSpawner