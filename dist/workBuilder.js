// 建筑工模型
var workerBuilder = {
    run(creep) {
        if (creep.memory.building && creep.carry.energy == 0) { // 如果工蜂的 building 属性为 ture 并且当前矿物为空
            creep.memory.building = false; // 停止建造模式
            creep.say('🔄 harvest'); // 输出 "开始挖矿" 字样
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) { // 如果 building 属性为 false && 工蜂矿物已满
            creep.memory.building = true; // 开始建造模式
            creep.say('🚧 build'); // 输出 "开始建造" 字样
        }

        if (creep.memory.building) { // 如果 building 属性是 true

            var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // 搜索附近建筑工地
            if (targets.length) { // 如果建筑工地还有
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) { // 工蜂执行建造操作,如果不在附近就朝建筑地出发
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    }); // 这个移动方法有一个轨迹参数,会把移动的轨迹显示出来
                }
            }
        } else {
            var sources = creep.room.find(FIND_SOURCES); // 寻找资源
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) { // 判断要收获的资源是超出工蜂的范围
                creep.moveTo(sources[1], {
                    visualizePathStyle: {
                        stroke: '#ffaa00'
                    }
                }); // 则让工蜂向基地方向移动 加上轨迹
            }
        }
    }

}
module.exports = workerBuilder