var basic = require('Basic') // 引用通用对象 (从基地获取矿物)

var workRepairer = {
    run(creep) {
        var MotherBase = basic.MotherBase // 母基地
        if (creep.carry.energy == 0) {
            if (creep.withdraw(MotherBase, RESOURCE_ENERGY, 50) == ERR_NOT_IN_RANGE) {
                creep.moveTo(MotherBase, {
                    visualizePathStyle: {
                        stroke: '#f00'
                    }
                })
            }
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL && structure.hits < 100000
            })
            targets.sort((a, b) => a.hits - b.hits)
            if (targets.length > 0) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#f00'
                        }
                    })
                }
            }
        }
    }
}

module.exports = workRepairer