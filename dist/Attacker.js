var basic = require('Basic')
/**
 * 攻击兵
 * @type {Object}
 */
var Attacker = {
    run(creep) {
        if (creep.room.name != 'W17N49') { // 房间比对需要对比两房间名是否相同, 否则可能会出现判断错误
            // const exitDir = creep.room.findExitTo('W17N49') // 寻找去该房间的出口
            const room_position = new RoomPosition(35, 32, 'W17N49')
            // const exit = creep.pos.findClosestByPath(exitDir)
            creep.moveTo(room_position, {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            }) // 出发！
        } else {

            const enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) // 寻找离得近的敌人
            if (enemy) {
                if (creep.attack(enemy) == ERR_NOT_IN_RANGE) { // 攻击敌人
                    creep.moveTo(new RoomPosition())
                }
            } else {
                creep.moveTo(Game.flags.Assembly)
            }
        }
    }
}
module.exports = Attacker