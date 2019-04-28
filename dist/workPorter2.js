/*
    搬运工 2 负责把大电池的矿物分别放入其他地方
 */
var workPorter2 = {
    run(creep) {


        let targets = creep.room.find(FIND_STRUCTURES, { // 寻找容器
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || (structure.structureType == STRUCTURE_TOWER && structure.energyCapacity - structure.energy >= creep.carryCapacity)) && structure.energy < structure.energyCapacity
            }
        })

        let storages = creep.room.find(FIND_STRUCTURES, { // 寻找大电池
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE)
            }
        })

        /*
            检测到有容器未满
         */
        if (targets.length > 0) {
            if (creep.carry.energy == 0) { // 如果当前搬运工的是 0 ,则去 大电池 获取矿物

                if (storages.length > 0) { // 如果有 storages ,则去 storages 取矿物
                    // console.log()
                    if (creep.withdraw(storages[0], RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storages[0], {
                            visualizePathStyle: {
                                stroke: '#CC9999'
                            }
                        })
                    }
                }

            } else {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 存矿
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#993333'
                        }
                    })
                }
            }

        } else {
            if (creep.carry.energy > 0) {
                if (creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { // 把矿存回大电池
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
module.exports = workPorter2