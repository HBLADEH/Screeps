// 入口文件 CTRL+ALT+F grunt screeps
var basic = require('Basic') // 通用对象
var workMiner = require('workMiner') // 矿工模型
var workMiner2 = require('workMiner2') // 矿工2模型
var workUpgrader = require('workUpgrader') // 升级工模型
var workBuilder = require('workBuilder') //建筑工模型
var workRepairer = require('workRepairer') //建筑工模型
var workRepairer2 = require('workRepairer2') //建筑工模型
var workPorter = require('workPorter') //运输工模型
var workPorter2 = require('workPorter2') //运输工2模型
var towerList = require('towerList') // 炮塔
var Attacker = require('Attacker') // 攻击兵
var Dismantle = require('Dismantle') // 拆除工
var Claimer = require('Claimer') // 控制工

var MotherBase = basic.MotherBase
var workerList = basic.workerList

module.exports.loop = function() {
    towerList.run(basic.towers) // 启动炮塔
    let thisSources = basic.thisRoom.find(FIND_SOURCES) // 当前地图上的所有资源
    let leftSources = basic.leftRoom.find(FIND_SOURCES) // 左边地图上的所有资源

    let containers = basic.thisRoom.find(FIND_STRUCTURES, { // 获取所有的 containers
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER)
        }
    })

    // console.log(containers)
    for (let i in workerList) {
        workerList[i].nowList = _.sum(Game.creeps, (creep) => creep.memory.role == workerList[i].type) // 获取当前该种类工蜂集合
        if (workerList[i].nowList < workerList[i].needSUM) { // 如果少于设置的数量则建造对应种类的工蜂
            let workerName = workerList[i].type + Game.time
            // console.log("正在孵化: " + workerName)
            MotherBase.spawnCreep(workerList[i].com, workerName, workerList[i].opt)
        }
    }
    // basic.showWorkList(workerList) // 显示一下工蜂数量
    // console.log("当前孵化器和扩展的矿物: "Game.rooms.W16N49.energyAvailable) 当前矿物


    for (let name in Memory.creeps) { // 遍历在内存的工蜂(包括死亡的)

        let creep = Game.creeps[name] // 获取该工蜂

        if (!creep) { // 该工蜂没有在游戏中找到(说明已死亡)
            delete Memory.creeps[name]; // 把该工蜂删除
            // console.log("删除已死亡工蜂:" + name) //输出日志
        } else {
            switch (creep.memory.role) { // 根据不同类别执行不同模块
                case 'miner':
                    workMiner.run(creep, basic.thisRoom, thisSources[0])
                    break
                case 'miner2':
                    workMiner2.run(creep, basic.thisRoom, thisSources, containers)
                    break
                case 'miner3_':
                    workMiner.run(creep, basic.leftRoom, leftSources[1])
                    break
                case 'upgrader':
                    workUpgrader.run(creep)
                    break
                case 'builder':
                    workBuilder.run(creep)
                    // workMiner.run(creep)
                    break
                case 'repairer':
                    workRepairer.run(creep)
                    break
                case 'repairer2':
                    workRepairer2.run(creep)
                    break
                case 'porter':
                    workPorter.run(creep)
                    break
                case 'porter2':
                    workPorter2.run(creep)
                    break
                case 'Attacker':
                    Attacker.run(creep)
                    break
                case 'dismantle':
                    Dismantle.run(creep)
                    break
                case 'claimer':
                    Claimer.run(creep)
                    break
            }
        }
    }
}