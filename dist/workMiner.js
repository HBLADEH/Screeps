// 挖矿工蜂
var workMiner = {
    run(creep, toRoom, source) {
        if (creep.room.name != toRoom.name) { // 工蜂当前的房间是否是指定的房间
            var room_position = new RoomPosition(source.x, source.y, toRoom.name)
            creep.moveTo(room_position) // 出发！
        } else {

            if (!creep.memory.working && creep.carry.energy == 0) { // 如果工蜂的 working 属性为 ture 并且当前矿物为空
                creep.memory.working = true; // 开始挖矿模式
            }
            if (creep.memory.working && creep.carry.energy == creep.carryCapacity) { // 如果 working 属性为 false && 工蜂矿物已满
                creep.memory.working = false; // 开始放矿物模式
            }

            if (creep.memory.working) {
                // var sources = creep.room.find(FIND_SOURCES); // 获取附近资源
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) { // 执行挖矿操作
                    creep.moveTo(source, {
                        visualizePathStyle: {
                            stroke: '#ffaa00'
                        }
                    })
                }
            } else {

                let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity // 搜寻指定类型的未满容器 || structure.structureType == STRUCTURE_TOWER
                    }
                })

                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 存矿
                        creep.moveTo(target, {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        })
                    }
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
                                }
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