// 挖矿工蜂
const basicFun = require('BasicFun')
var workMiner = {
    run(creep, toRoom, source, backRoom) {

        const move_opt = {
            visualizePathStyle: {
                stroke: '#ffaa00'
            },
            reusePath: 30, // 重复路径
        }

        if (!creep.memory.working && creep.carry.energy == 0) { // 如果工蜂的 working 属性为 ture 并且当前矿物为空
            creep.memory.working = true; // 开始挖矿模式
        }
        if (creep.memory.working && creep.carry.energy == creep.carryCapacity) { // 如果 working 属性为 false && 工蜂矿物已满
            creep.memory.working = false; // 开始放矿物模式
        }
        // var source2 = creep.room.find(FIND_SOURCES)
        if (creep.memory.working) {
            if (creep.room.name != toRoom.name) { // 工蜂当前的房间是否是指定的房间
                // console.log(toRoom.name)
                var room_position = new RoomPosition(35, 32, toRoom.name)
                creep.moveTo(room_position) // 出发！
            } else {
                // console.log(source)
                // var sources = creep.room.find(FIND_SOURCES); // 获取附近资源
                basicFun.doHarvest(creep, source, move_opt)
            }

        } else {

            if (creep.room.name != backRoom.name) {
                let notWall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax)
                    }
                })
                if (notWall) {
                    if (creep.repair(notWall) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(notWall, {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            },
                            reusePath: 10, // 重复路径
                        })
                    }
                } else {
                    // console.log(backRoom.name)
                    var room_position = new RoomPosition(7, 41, backRoom.name)
                    creep.moveTo(room_position, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        },
                        reusePath: 10, // 重复路径
                    }) // 出发！
                }
            } else {
                let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity // 搜寻指定类型的未满容器 || structure.structureType == STRUCTURE_TOWER
                    }
                })

                if (target) {
                    // if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 存矿
                    //     creep.moveTo(target, {
                    //         visualizePathStyle: {
                    //             stroke: '#ffffff'
                    //         },
                    //         reusePath: 10, // 重复路径
                    //     })
                    // }
                    basicFun.doTransfer(creep, target, RESOURCE_ENERGY, move_opt)
                } else {
                    let storages = creep.room.find(FIND_STRUCTURES, { // 寻找大容器
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE)
                        }
                    })
                    if (storages.length > 0) {
                        if (creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 存矿
                            creep.moveTo(storages[0], {
                                visualizePathStyle: {
                                    stroke: '#993333'
                                },
                                reusePath: 10, // 重复路径
                            })
                        }
                    }
                }
            }
        }

    }
}

module.exports = workMiner



/**
 * 下面是正常模式
 */

// if (creep.carry.energy < creep.carryCapacity) { // 判断当工蜂的矿物是否存满
//     var sources = creep.room.find(FIND_SOURCES); // 获取附近资源
//     if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // 执行挖矿操作
//         creep.moveTo(sources[0], {
//             visualizePathStyle: {
//                 stroke: '#ffaa00'
//             }
//         })
//     }
// } else { // 寻找附近空的容器存放矿物
//     var targets = creep.room.find(FIND_STRUCTURES, {
//         filter: (structure) => {
//             return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity; // 搜寻指定类型的未满容器
//         }
//     })
//     if (targets.length > 0) {
//         if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
//             creep.moveTo(targets[0], {
//                 visualizePathStyle: {
//                     stroke: '#ffffff'
//                 }
//             })
//         }
//     }
// }