var basic = require('Basic') // 引用通用对象 (挖矿获取矿物)

var workRepairer2 = {
    run(creep) {
        var MotherBase = basic.MotherBase // 母基地
        if (!creep.memory.working && creep.carry.energy == 0) { // 如果工蜂的 working 属性为 ture 并且当前矿物为空
            creep.memory.working = true; // 开始挖矿模式
        }
        if (creep.memory.working && creep.carry.energy == creep.carryCapacity) { // 如果 working 属性为 false && 工蜂矿物已满
            creep.memory.working = false; // 开始放矿物模式
        }


        if (creep.memory.working) {
            var sources = creep.room.find(FIND_SOURCES); // 获取附近资源
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) { // 执行挖矿操作
                creep.moveTo(sources[1], {
                    visualizePathStyle: {
                        stroke: '#f00'
                    }
                })
            }
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax
            })
            targets.sort((a, b) => a.hits - b.hits)
            if (targets.length) {
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#f00'
                        }
                    })
                }
            }
        }

        // if (creep.carry.energy == 0) {
        //     if (creep.withdraw(MotherBase, RESOURCE_ENERGY, 50) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(MotherBase, {
        //             visualizePathStyle: {
        //                 stroke: '#f00'
        //             }
        //         })
        //     }
        // } else {
        //     const targets = creep.room.find(FIND_STRUCTURES, {
        //         filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL && structure.hits < 100000
        //     })
        //     targets.sort((a, b) => a.hits - b.hits)
        //     if (targets.length > 0) {
        //         if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        //             creep.moveTo(targets[0], {
        //                 visualizePathStyle: {
        //                     stroke: '#f00'
        //                 }
        //             })
        //         }
        //     }
        // }
    }
}

module.exports = workRepairer2