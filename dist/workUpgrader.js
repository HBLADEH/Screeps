var basic = require('Basic') // 引用通用对象

var workUpgrader = {
    // run(creep) {
    //     var MotherBase = basic.MotherBase
    //     if (creep.carry.energy == 0) { // 该工蜂携带的能量是否为空
    //         // var sources = creep.room.find(FIND_SOURCES); // 定义指定的矿物
    //         // if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) { // 采矿操作,如果离资源较远的话就朝资源方向移动
    //         //     creep.moveTo(sources[1], {
    //         //         visualizePathStyle: {
    //         //             stroke: '#338de6'
    //         //         }
    //         //     })
    //         // }
    //         // if (creep.withdraw(MotherBase, RESOURCE_ENERGY, 50) == ERR_NOT_IN_RANGE) { // 从母基地获取资源
    //         //     creep.moveTo(MotherBase, {
    //         //         visualizePathStyle: {
    //         //             stroke: '#338de6'
    //         //         }
    //         //     })
    //         // }

    //         var targets = creep.room.find(FIND_STRUCTURES, {
    //             filter: (structure) => {
    //                 return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy >= 50 // 搜寻指定类型的大于50矿物的容器
    //             }
    //         })
    //         if (creep.withdraw(targets[0], RESOURCE_ENERGY, creep.carryCapacity) == ERR_NOT_IN_RANGE) { // 从容器获取资源
    //             creep.moveTo(targets[0], {
    //                 visualizePathStyle: {
    //                     stroke: '#338de6'
    //                 }
    //             })
    //         }
    //     } else {

    //         if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { // 执行升级 Controller 操作,如果离 Controller 较远, 则向 Controller 移动
    //             creep.moveTo(creep.room.controller, {
    //                 visualizePathStyle: {
    //                     stroke: '#338de6'
    //                 }
    //             })
    //         }
    //     }
    // }

    run(creep) {
        // var MotherBase = Game.spawns['MotherBase']
        if (creep.memory.working && creep.carry.energy == 0) { // 如果工蜂的 working 属性为 ture 并且当前矿物为空
            creep.memory.working = false; // 停止建造模式
            creep.say('🔄 挖矿模式');
        }
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) { // 如果 working 属性为 false && 工蜂矿物已满
            creep.memory.working = true; // 开始升级模式
            creep.say('🚧 升级模式');
        }


        if (creep.memory.working) { // 如果 working 属性是 true
            if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) { // 工蜂执行建造操作,如果不在附近就朝建筑地出发
                    creep.moveTo(creep.room.controller, {
                        visualizePathStyle: {
                            stroke: '#338de6'
                        }
                    }) // 这个移动方法有一个轨迹参数,会把移动的轨迹显示出来
                }
            }

        } else {
            var sources = creep.room.find(FIND_SOURCES); // 寻找资源
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // 判断要收获的资源是超出工蜂的范围
                creep.moveTo(sources[0], {
                    visualizePathStyle: {
                        stroke: '#338de6'
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

module.exports = workUpgrader