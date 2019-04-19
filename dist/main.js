// 入口文件 CTRL+ALT+F
var workMiner = require('workMiner');
var workUpgrader = require('workUpgrader');
module.exports.loop = function() {

    var MotherBase = Game.spawns['MotherBase'];

    for (var name in Memory.creeps) { // 遍历在内存的工蜂(包括死亡的)
        if (!Game.creeps[name]) { // 该工蜂没有在游戏中找到(说明已死亡)
            delete Memory.creeps[name]; // 把该工蜂删除
            console.log("删除已死亡工蜂:" + name); //输出日志
        }
    }

    var minerCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner'); // 类型是 miner 的工蜂数量
    var upgradeCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'); // 类型是 upgrader 的工蜂数量

    var workerList = [{
        type: 'miner',
        val: minerCount
    }, {
        type: 'upgrader',
        val: upgradeCount
    }, ];

    var strList = '目前工蜂数量:';
    for (var i in workerList) {
        strList += ' ' + workerList[i].type + ': ' + workerList[i].val.length;
    }
    console.log(strList);

    if (minerCount.length < 2) { // 如果矿工的数量小于指定的数值
        var minerName = 'miner' + Game.time; // 给矿工生成一个唯一的名字
        console.log('正在孵化矿工:' + minerName);
        MotherBase.spawnCreep([WORK, CARRY, MOVE], minerName, {
            memory: {
                role: 'miner'
            }
        }); // 孵化指定类型工蜂
    }

    if (upgradeCount.length < 2) { // 如果升级工的数量小于指定的数值
        var minerName = 'upgrade' + Game.time; // 给矿工生成一个唯一的名字
        console.log('正在孵化矿工:' + minerName);
        MotherBase.spawnCreep([WORK, CARRY, MOVE], minerName, {
            memory: {
                role: 'upgrader'
            }
        }); // 孵化指定类型工蜂
    }

    if(MotherBase.spawing) { // 如果基地在孵化
        var spawningCreep = Game.creeps[MotherBase.spawing.name];
        MotherBase.room.visual.text('🛠' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role) { // 根据不同类别执行不同模块
            case 'miner':
                workMiner.run(creep);
                break;
            case 'upgrader':
                workUpgrader.run(creep);
                break;
        }
    }

}