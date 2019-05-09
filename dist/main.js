// 入口文件 CTRL+ALT+F grunt screeps
var basic = require('Basic') // 通用对象
var workMiner = require('workMiner') // 矿工模型
// var workMiner2 = require('workMiner2') // 矿工2模型
var workMinerS = require('workMinerS') // 矿工S模型
var workUpgrader = require('workUpgrader') // 升级工模型
var workBuilder = require('workBuilder') //建筑工模型
var workRepairer = require('workRepairer') //修复工模型
var workPorter = require('workPorter') //运输工模型
var workPorter2 = require('workPorter2') //运输工2模型
var workPorterS = require('workPorterS') //运输工2模型
var towerList = require('towerList') // 炮塔
var Attacker = require('Attacker') // 攻击兵
var Dismantle = require('Dismantle') // 拆除工
var Claimer = require('Claimer') // 控制工
// var testCreep = require('testCreep') // for test

var MotherBase = basic.MotherBase
var workerList = basic.workerList

module.exports.loop = function() {
    towerList.run(basic.towers) // 启动炮塔
    // console.log(basic.leftRoom)
    let thisSources = basic.thisRoom.find(FIND_SOURCES) // 当前地图上的所有资源
    let leftSources = basic.leftRoom.find(FIND_SOURCES) // 左边地图上的所有资源

    let containers = basic.thisRoom.find(FIND_STRUCTURES, { // 获取当前房间所有的 containers
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER)
        }
    })
    let leftcontainers = basic.leftRoom.find(FIND_STRUCTURES, { // 获取当前房间所有的 containers
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER)
        }
    })

    let storages = basic.thisRoom.find(FIND_STRUCTURES, { // 寻找当前房间所有的大容器
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE)
        }
    })

    // console.log(containersHaveEnergy)
    // 如果指定工蜂数量不足,孵化指定工蜂
    for (let i in workerList) {
        workerList[i].nowList = _.sum(Game.creeps, (creep) => creep.memory.role == workerList[i].type) // 获取当前该种类工蜂集合
        if (workerList[i].nowList < workerList[i].needSUM) { // 如果少于设置的数量则建造对应种类的工蜂
            let workerName = workerList[i].type + Game.time
            // console.log("正在孵化: " + workerList[i].type)
            let retCode = MotherBase.spawnCreep(workerList[i].com, workerName, workerList[i].opt)
            if (retCode != -4) {
                console.log('workerType: ' + workerList[i].type + ', ErrCode: ' + retCode)
            }
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
                    workMiner.run(creep, basic.thisRoom, thisSources[0], basic.thisRoom)
                    break
                    // case 'miner2':
                    //     workMiner2.run(creep, basic.thisRoom, thisSources, containers[2])
                    //     break
                    // case 'miner3_':
                    //     workMiner.run(creep, basic.leftRoom, leftSources[1])
                    //     break
                case 'left_miner':
                    workMiner.run(creep, basic.leftRoom, leftSources[0], basic.thisRoom)
                    break
                case 'minerS':
                    workMinerS.run(creep, basic.thisRoom, thisSources[0], containers[1])
                    break
                case 'left_minerS':
                    workMinerS.run(creep, basic.leftRoom, leftSources[1], leftcontainers[0])
                    break
                case 'miner2S':
                    workMinerS.run(creep, basic.thisRoom, thisSources[1], containers[0])
                    break
                case 'upgrader':
                    workUpgrader.run(creep, basic.thisRoom, storages[0], basic.thisRoom)
                    break
                case 'left_upgrader':
                    workUpgrader.run(creep, basic.leftRoom, storages[0], basic.thisRoom)
                    break
                case 'builder':
                    workBuilder.run(creep, basic.leftRoom)
                    break
                case 'repairer':
                    workRepairer.run(creep)
                    break
                case 'porter':
                    workPorter.run(creep, containers[0], storages[0])
                    break
                case 'porterS':
                    workPorterS.run(creep, basic.thisRoom, containers[0], storages[0], basic.thisRoom)
                    break
                case 'left_porterS':
                    workPorterS.run(creep, basic.leftRoom, leftcontainers[0], storages[0], basic.thisRoom)
                    break
                case 'porter2':
                    workPorter2.run(creep, containers[1], storages[0])
                    break
                case 'attack':
                    Attacker.run(creep)
                    break
                case 'dismantle':
                    Dismantle.run(creep)
                    break
                case 'claimer':
                    Claimer.run(creep)
                    break
                    // case 'test':
                    //     testCreep.run(creep)
                    //     break
            }
        }
    }
}