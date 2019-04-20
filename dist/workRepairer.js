var workRepairer = {
    run(creep) {
        var MotherBase = Game.spawns['MotherBase']
        if (creep.carry.energy == 0) {
            if (creep.withdraw(MotherBase, RESOURCE_ENERGY, 20) == ERR_NOT_IN_RANGE) {
                creep.moveTo(MotherBase)
            }
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            })
            targets.sort((a, b) => a.hits - b.hits)
            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0])
                }
            }
        }
    }
}

module.exports = workRepairer