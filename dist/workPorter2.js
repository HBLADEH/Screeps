/*
    搬运工 2 负责把大电池的矿物分别放入其他地方
 */
var SaveLife = require('SaveLife')
var basicFun = require('BasicFun')
var workPorter2 = {
    run(creep, container, storage) {

        const move_opt = {
            visualizePathStyle: {
                stroke: '#993333'
            }
        }

        // let targets = creep.room.find(FIND_STRUCTURES, { // 寻找容器
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || (structure.structureType == STRUCTURE_TOWER && structure.energyCapacity - structure.energy >= creep.carryCapacity)) && structure.energy < structure.energyCapacity
        //     }
        // })
        if (creep.ticksToLive < 200) {
            creep.memory.almost_Dead = true
        }
        if (creep.memory.almost_Dead) {
            SaveLife.run(creep)
        } else {
            let container_store = container.store[RESOURCE_ENERGY]
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, { // 寻找容器
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity
                }
            })
            let tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER && structure.energyCapacity - structure.energy >= creep.carryCapacity)
                }
            })

            /*
                检测到工蜂的是否没有矿物
             */
            if (creep.carry.energy == 0) { // 如果当前搬运工的是 0 

                if (container_store >= creep.carryCapacity) { // 判断指定的 container 的存储矿物是否足够,够就去取矿
                    basicFun.doWithdraw(creep, container, RESOURCE_ENERGY, creep.carryCapacity, move_opt)
                } else if (storage && (target || tower)) { // 如果 container 的矿物不足,则判断storage是否存在 只有在有需要补充的容器存在时才去 storage 取矿
                    basicFun.doWithdraw(creep, storage, RESOURCE_ENERGY, creep.carryCapacity, move_opt)
                }
            } else {
                if (target) { // 判断有无需要补充的容器,有就补充
                    basicFun.doTransfer(creep, target, RESOURCE_ENERGY, move_opt)
                } else if (tower) {
                    basicFun.doTransfer(creep, tower, RESOURCE_ENERGY, move_opt)
                } else if (creep.carry.energy > 0) { // 没有的话就就把工蜂剩余的矿存在 storage
                    basicFun.doTransfer(creep, storage, RESOURCE_ENERGY, move_opt)
                }
            }
        }
    }
}
module.exports = workPorter2