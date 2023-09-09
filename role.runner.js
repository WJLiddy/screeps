var roleRunner = {
    
    run: function(creep) {

        function build()
        {
            if(creep.store.getUsedCapacity() == 0)
            {
                creep.memory.state = "GATHER"
                creep.say("🍆💦")
                return;
            }
            
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    		if(targets.length)
    		{
    			if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
    				creep.moveTo(targets[0]);
    			}
    			return;
    		}
    		else
    		{
    		    // nothing to build! so supply.
                creep.memory.state = "SUPPLY"
                creep.say("👉🍑")
    		}
        }
        
        function upgrade()
        {
            if(creep.store.getUsedCapacity() == 0)
            {
                creep.memory.state = "GATHER"
                creep.say("🍆💦")
                return;
            }
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        
        
        function supply()
        {
            var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER) && 
                                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                });
                
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
            
            if(targets.length == 0)
            {
                // nothing to supply! so build.
                creep.say("😏😏")
                creep.memory.state = "BUILD"
            }
            
            if(creep.store.getUsedCapacity() == 0)
            {
                creep.memory.state = "GATHER"
                creep.say("🍆💦")
            }
        }
        
        function gather()
        {
            const targets = creep.room.find(FIND_DROPPED_RESOURCES);
            if(targets.length > 0)
            {
                if(creep.pickup(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#0000ff'}});
                }
            }
            if(creep.store.getFreeCapacity() == 0)
            {
                creep.memory.state = Math.random() > 0.5 ? "SUPPLY" : "BUILD"
                if(creep.memory.state == "SUPPLY")
                {
                    creep.say("👉🍑")
                }
                else
                {
                    if(Math.random() > 0.8)
                    {
                        creep.memory.state = "UPGRADE"
                        creep.say("❗")
                    } else
                    {
                        creep.say("😏😏")
                    }
                }
            }
        }
    
        
        if(creep.memory.state == "GATHER")
        {
            gather()
        }
        else if(creep.memory.state == "SUPPLY")
        {
            supply()
        }
        else if(creep.memory.state == "BUILD")
        {
            build()
        }
        else
        {
            upgrade()
        }
	}
};

module.exports = roleRunner;