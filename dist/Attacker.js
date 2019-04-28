var basic = require('Basic')
/**
 * 攻击兵
 * @type {Object}
 */
var Attacker = {
    run(creep) {
        if (creep.room.name != basic.leftRoom.name) { // 房间比对需要对比两房间名是否相同, 否则可能会出现判断错误
            const exitDir = creep.room.findExitTo(basic.leftRoom.name) // 寻找去该房间的出口
            const exit = creep.pos.findClosestByPath(exitDir)
            creep.moveTo(exit) // 出发！
        }
        if (creep.room == basic.thisRoom || creep.room == basic.leftRoom) {
            const enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) // 寻找离得近的敌人
            if (enemys) {
                if (creep.attack(enemy) == ERR_NOT_IN_RANGE) { // 攻击敌人
                    creep.moveTo(new RoomPosition())
                }
            }
        }
    }
}
module.exports = Attacker