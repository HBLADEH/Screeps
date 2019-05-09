var basicFun = require('BasicFun')
var workUpgrader = {
    run(creep, toRoom, target, backRoom) {
        var move_opt = {
            visualizePathStyle: {
                stroke: '#338de6'
            },
            reusePath: 30,
        }

        if (creep.carry.energy == 0) { // 该工蜂携带的能量是否为空
            if (creep.room.name != backRoom.name) {
                basicFun.toRoom(creep, backRoom.name, move_opt)
            } else if (target) {
                basicFun.doWithdraw(creep, target, RESOURCE_ENERGY, creep.carryCapacity, move_opt)
            }

        } else {
            if (creep.room.name != toRoom.name) {
                basicFun.toRoom(creep, toRoom.name, move_opt)
            } else {

                basicFun.doUpgradeController(creep, creep.room.controller, move_opt)
            }
        }

    }
}

module.exports = workUpgrader
// var targets = creep.room.find(FIND_STRUCTURES, {
//     filter: (structure) => {
//         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy >= 50 // 搜寻指定类型的大于50矿物的容器
//     }
// })