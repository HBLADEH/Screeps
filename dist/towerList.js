var towerList = {
    run(towers) {
        for (var i in towers) {
            var tower = towers[i].tower
            if (tower) { // 如果该塔存在
                const closestHostileCreeps = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS) // 寻找敌对工蜂
                if (closestHostileCreeps) {
                    tower.attack(closestHostileCreeps) // 攻击
                } else {
                    const hurtCreeps = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: (creep) => creep.hits < creep.hitsMax
                    }) // 寻找受伤工蜂
                    if (hurtCreeps) {
                        tower.heal(hurtCreeps) // 修复
                    } else {
                        const closestDamageStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
                        }) // 获取附近的受损物体 && structure.hits < 750000
                        if (closestDamageStructure) {
                            tower.repair(closestDamageStructure) // 修复受损墙
                        }
                    }
                }
            }
        }
    }
}

module.exports = towerList