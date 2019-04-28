var basic = require('Basic')

var Claimer = {
    run(creep) {
        if (creep.room.name != basic.leftRoom.name) { // 房间比对需要对比两房间名是否相同, 否则可能会出现判断错误

            const exitDir = creep.room.findExitTo(basic.leftRoom.name) // 寻找去该房间的出口
            const exit = creep.pos.findClosestByRange(exitDir)
            creep.moveTo(exit) // 出发！
            // creep.moveTo(basic.leftRoom)
        } else {
            if (creep.room.controller && !creep.room.controller.my) { // 判断这个控制器是否存在，是不是我的
                if (creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                if (creep.room.controller) {
                    if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
    }
}
module.exports = Claimer