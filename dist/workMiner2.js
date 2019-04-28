// 挖矿工蜂 (2矿使用的模型)
var workMiner2 = {
    run(creep, toRoom, sources, containers) {

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
                if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) { // 执行挖矿操作
                    creep.moveTo(sources[1], {
                        visualizePathStyle: {
                            stroke: '#ffaa00'
                        },
                        reusePath: 50, // 重复路径
                    })
                }
            } else {
                // let containers = creep.room.find(FIND_STRUCTURES, { // 获取所有的 containers
                //     filter: (structure) => {
                //         return (structure.structureType == STRUCTURE_CONTAINER)
                //     }
                // })
                if (containers.length > 0) {
                    if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 存矿
                        creep.moveTo(containers[0], {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            },
                            reusePath: 50, // 重复路径
                        })
                    }
                }
                // if (targets.length > 0) {
                //     if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 存矿
                //         creep.moveTo(targets[0], {
                //             visualizePathStyle: {
                //                 stroke: '#ffffff'
                //             }
                //         })
                //     }
                // }
            }
        }
    }
}

module.exports = workMiner2



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