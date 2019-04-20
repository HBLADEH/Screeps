// 建筑工模型
var workerBuilder = {
    run(creep) {
        var MotherBase = Game.spawns['MotherBase']
        if (creep.carry.energy == 0) { // 如果处于建筑模式下没有矿物了
            if (creep.withdraw(MotherBase, RESOURCE_ENERGY, 40) == ERR_NOT_IN_RANGE) {
                creep.moveTo(MotherBase)
            }
        } else {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // 搜索附近的建筑工地
            if (targets.length) { // 如果存在建筑工地
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) { // 执行建筑工作，如果不在范围内则向该处移动
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#99CCCC'
                        }
                    })
                }
            }
        }
    }
}
module.exports = workerBuilder