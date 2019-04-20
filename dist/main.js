// 入口文件 CTRL+ALT+F start grunt screeps
var basicFun = require('BasicFun') // 通用函数模型
var workMiner = require('workMiner') // 矿工模型
var workUpgrader = require('workUpgrader') // 升级工模型
var workBuilder = require('workBuilder') //建筑工模型
var workRepairer = require('workRepairer') //建筑工模型

// 各工蜂的数量
var minerSUM = 2
var upgraderSUM = 2
var builderSUM = 3
var repairerSUM = 1

/**
 * 各工蜂的类型定义 type: 工蜂类型, needSUM: 需要的最大数量, nowList: 目前的工蜂数组, com: 工蜂组件, opt: 其他配置项
 * [workerList description]
 * @type {Array}
 */
var workerList = [{
    type: 'miner',
    needSUM: 2,
    nowList: [],
    com: [WORK, CARRY, MOVE],
    opt: {
        memory: {
            role: this.type
        }
    }
}, {
    type: 'upgrader',
    nowList: [],
    needSUM: 2,
    com: [WORK, CARRY, MOVE],
    opt: {
        memory: {
            role: this.type
        }
    }
}, {
    type: 'builder',
    nowList: [],
    needSUM: 3,
    com: [WORK, CARRY, MOVE],
    opt: {
        memory: {
            role: this.type
        }
    }
}, {
    type: 'repairer',
    nowList: [],
    needSUM: 1,
    com: [WORK, CARRY, MOVE],
    opt: {
        memory: {
            role: this.type
        }
    }
}]
module.exports.loop = function() {
    // Game.rooms.sim.createConstructionSite()
    var MotherBase = Game.spawns['MotherBase']

    for (var name in Memory.creeps) { // 遍历在内存的工蜂(包括死亡的)
        if (!Game.creeps[name]) { // 该工蜂没有在游戏中找到(说明已死亡)
            delete Memory.creeps[name]; // 把该工蜂删除
            console.log("删除已死亡工蜂:" + name) //输出日志
        }
    }


    

    

    for (var i in workerList) {

        workerList[i].nowList = _.filter(Game.creeps, (creep) => creep.memory.role == workerList[i].type)

        if (workerList[i].nowList.length < workerList[i].needSUM) {
            var workerName = workerList[i].type + Game.time
            MotherBase.spawnCreep(workerList[i].com, workerName, workerList[i].opt)
        }

    }

    // basicFun.showWorkList(workerList) // 显示一下工蜂数量

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
                workBuilder.run(creep)
                break
            case 'repairer':
                workRepairer.run(creep)
                break
        }
    }
}