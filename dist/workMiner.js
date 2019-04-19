// 挖矿工蜂
var workMiner = {
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) { // 判断当工蜂的矿物是否存满
            var sources = creep.room.find(FIND_SOURCES); // 获取附近资源
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) { // 执行挖矿操作
                creep.moveTo(sources[1], {
                    visualzePathStyle: {
                        stroke: '#ffaa00'
                    }
                });
            }else {
            }
        } else { // 寻找附近空的容器存放矿物
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity; // 搜寻指定类型的未满容器
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    })
                }
            }
        }
    }
};

module.exports = workMiner;