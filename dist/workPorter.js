/*
    搬运工 
 */
var workPorter = {
    run(creep) {
        if (creep.carry.energy == 0) { // 如果当前搬运工的是 0 ,则去 container 获取矿物
            let containers = creep.room.find(FIND_STRUCTURES, { // 获取所有的 containers
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER)
                }
            })

            if (containers.length > 0) { // 如果有 containers ,则去 containers 搬运矿物
                if (creep.withdraw(containers[0], RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {
                        visualizePathStyle: {
                            stroke: '#CC9999'
                        },
                        reusePath: 50,
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
                            reusePath: 50, // 重复路径
                        })
                    }
                }
            // }


        }
    }
}
module.exports = workPorter