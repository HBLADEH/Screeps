var workUpgrader = {
    run(creep) {
        var MotherBase = Game.spawns['MotherBase']
        if (creep.carry.energy == 0) { // 该工蜂携带的能量是否为空
            // var sources = creep.room.find(FIND_SOURCES); // 定义指定的矿物
            // if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) { // 采矿操作,如果离资源较远的话就朝资源方向移动
            //     creep.moveTo(sources[1])
            // }   
            if (creep.withdraw(MotherBase, RESOURCE_ENERGY, 40) == ERR_NOT_IN_RANGE) { // 从母基地获取资源
                creep.moveTo(MotherBase)
            }
        } else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { // 执行升级 Controller 操作,如果离 Controller 较远, 则向 Controller 移动
                creep.moveTo(creep.room.controller)
            }
        }
    }
};

module.exports = workUpgrader