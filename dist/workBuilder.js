var workUpgrader = require('workUpgrader') // 升级工模型

var basic = require('Basic') // 引用通用对象
// 建筑工模型
var workerBuilder = {
    run(creep) {
        var MotherBase = basic.MotherBase
        if (creep.memory.working && creep.carry.energy == 0) { // 如果工蜂的 working 属性为 ture 并且当前矿物为空
            creep.memory.working = false; // 停止建造模式
            // creep.say('🔄 挖矿模式'); // 输出 "开始挖矿" 字样
        }
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) { // 如果 working 属性为 false && 工蜂矿物已满 最大容量为 creep.carryCapacity
            creep.memory.working = true; // 开始建造模式
            // creep.say('🚧 建造模式'); // 输出 "开始建造" 字样
        }


        if (creep.memory.working) { // 如果 working 属性是 true

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES) // 搜索附近建筑工地
            if (targets.length) { // 如果建筑工地还有
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) { // 工蜂执行建造操作,如果不在附近就朝建筑地出发
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    }); // 这个移动方法有一个轨迹参数,会把移动的轨迹显示出来
                }
            } else {
                workUpgrader.run(creep) // 变成升级工蜂
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES) // 寻找资源

            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) { // 判断要收获的资源是超出工蜂的范围
                creep.moveTo(sources[1], {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                }); // 则让工蜂向基地方向移动 加上轨迹
            }
            // var targets = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy >= 50 // 搜寻指定类型的未满容器
            //     }
            // })
            // if (creep.withdraw(targets[0], RESOURCE_ENERGY, 50) == ERR_NOT_IN_RANGE) { // 从母基地获取资源
            //     creep.moveTo(MotherBase, {
            //         visualizePathStyle: {
            //             stroke: '#ffaa00'
            //         }
            //     })
            // }
        }
    }

}
module.exports = workerBuilder