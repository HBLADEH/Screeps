var SaveLife = require('SaveLife')
/*
    搬运工 
 */
var workPorter = {
    run(creep, container, storage) {
        if (creep.ticksToLive < 200) {
            creep.memory.almost_Dead = true
        }
        if (creep.memory.almost_Dead) {
            SaveLife.run(creep)
        } else {
            if (creep.carry.energy == 0) { // 如果当前搬运工的是 0 ,则去 container 获取矿物

                // const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES)
                // if (target) {
                //     if (creep.pickup(target) == ERR_NOT_IN_RANGE) {
                //         creep.moveTo(target, {
                //             visualizePathStyle: {
                //                 stroke: '#CC9999'
                //             },
                //             reusePath: 20,
                //         })
                //     }
                // } else
                if (container) { // 如果有 containers ,则去 containers 搬运矿物
                    if (creep.withdraw(container, RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, {
                            visualizePathStyle: {
                                stroke: '#CC9999'
                            },
                            reusePath: 20,
                        })
                    }
                }

            } else {

                // let targets = creep.pos.findClosestByPath(FIND_STRUCTURES, { // 寻找容器
                //     filter: (structure) => {
                //         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity
                //     }
                // })
                // if (targets) {
                //     if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 存矿
                //         creep.moveTo(targets, {
                //             visualizePathStyle: {
                //                 stroke: '#993333'
                //             },
                //             reusePath: 50 // 重复路径
                //         })
                //     }
                // } else {
                // let storages = creep.room.find(FIND_STRUCTURES, { // 寻找大容器
                //     filter: (structure) => {
                //         return (structure.structureType == STRUCTURE_STORAGE)
                //     }
                // })
                if (storage) {
                    if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 存矿
                        creep.moveTo(storage, {
                            visualizePathStyle: {
                                stroke: '#993333'
                            },
                            reusePath: 20, // 重复路径
                        })
                    }
                }
                // }
            }
        }

    }
}
module.exports = workPorter