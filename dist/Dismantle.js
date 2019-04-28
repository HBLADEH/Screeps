var basic = require('Basic')

/**
 * 拆除工
 * @type {Object}
 */
var Dismantle = {
    run(creep) {
        if (creep.room.name != basic.leftRoom.name) { // 房间比对需要对比两房间名是否相同, 否则可能会出现判断错误

            const exitDir = creep.room.findExitTo(basic.leftRoom.name) // 寻找去该房间的出口
            const exit = creep.pos.findClosestByRange(exitDir)
            creep.moveTo(exit) // 出发！
            // creep.moveTo(basic.leftRoom.name)
        } else {

            const Closest_structures2 = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType != STRUCTURE_ROAD && structure.structureType != STRUCTURE_WALL)
                }
            })
            // console.log("?")
            const Closest_structures = Game.getObjectById('5cb4aaab8b0d4711d77eb411')
            if (Closest_structures) {
                // console.log(creep.name)
                if (creep.dismantle(Closest_structures) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Closest_structures)
                }
            } else if (Closest_structures2) {
                if (creep.dismantle(Closest_structures2) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Closest_structures2)
                }
            } else if (creep.room.controller && !creep.room.controller.my) {
                if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }

    }
}
module.exports = Dismantle