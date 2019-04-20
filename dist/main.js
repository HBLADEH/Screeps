// 入口文件 CTRL+ALT+F start grunt screeps
var basicFun = require('BasicFun') // 通用函数模型
var workMiner = require('workMiner') // 矿工模型
var workUpgrader = require('workUpgrader') // 升级工模型
var workBuilder = require('workBuilder') //建筑工模型

// 各工蜂的数量
minerSUM = 4;
upgraderSUM = 2;
builderSUM = 0;

module.exports.loop = function() {
    // Game.rooms.sim.createConstructionSite()
    var MotherBase = Game.spawns['MotherBase']

    for (var name in Memory.creeps) { // 遍历在内存的工蜂(包括死亡的)
        if (!Game.creeps[name]) { // 该工蜂没有在游戏中找到(说明已死亡)
            delete Memory.creeps[name]; // 把该工蜂删除
            console.log("删除已死亡工蜂:" + name) //输出日志
        }
    }

    var minerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner') // 类型是 miner 的工蜂数量
    var upgradeCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader') // 类型是 upgrader 的工蜂数量
    var builderCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')

    var workerList = [{
        type: 'miner',
        val: minerCount,
        need: minerSUM
    }, {
        type: 'upgrader',
        val: upgradeCount,
        need: upgraderSUM
    }, {
        type: 'builder',
        val: builderCount,
        need: builderSUM
    }]

    // basicFun.showWorkList(workerList) // 显示一下工蜂数量

    for (var i in workerList) {
        if (workerList[i].val.length < workerList[i].need) {
            var workerName = workerList[i].type + Game.time
            MotherBase.spawnCreep([WORK, CARRY, MOVE], workerName, {
                memory: {
                    role: workerList[i].type
                }
            })
        }
    }

    if (MotherBase.spawning) { // 如果基地在孵化
        var spawningCreep = Game.creeps[MotherBase.spawning.name];
        MotherBase.room.visual.text('🛠 ' + spawningCreep.memory.role,
            MotherBase.pos.x + 1,
            MotherBase.pos.y, {
                align: 'left',
                opacity: 0.8
            })
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name]

        switch (creep.memory.role) { // 根据不同类别执行不同模块
            case 'miner':
                workMiner.run(creep)
                break
            case 'upgrader':
                workUpgrader.run(creep)
                break
            case 'builder':
                // workBuilder.run(creep)
                break
        }
    }
}