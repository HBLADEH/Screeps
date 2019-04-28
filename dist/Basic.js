/**
 * 通用对象
 */
var Basic = {
    MotherBase: Game.spawns['MotherBase'], // 母基地
    thisRoom: Game.rooms['W16N49'],
    leftRoom: Game.rooms['W17N49'],
    workerList: [{
        type: 'miner',
        needSUM: 2,
        nowList: [],
        com: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'miner',
                working: true
            }
        }
    }, {
        type: 'miner2',
        nowList: [],
        needSUM: 2,
        com: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
        opt: {
            memory: {
                role: 'miner2',
                working: true
            }
        }
    }, {
        type: 'miner3_',
        needSUM: 0,
        nowList: [],
        com: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        opt: {
            memory: {
                role: 'miner3_',
                working: true
            }
        }
    }, {
        type: 'upgrader',
        nowList: [],
        needSUM: 2,
        com: [WORK, WORK, CARRY, MOVE, MOVE],
        opt: {
            memory: {
                role: 'upgrader',
                working: false
            }
        }
    }, {
        type: 'builder',
        nowList: [],
        needSUM: 0,
        com: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        opt: {
            memory: {
                role: 'builder',
                working: false
            }
        }
    }, {
        type: 'repairer',
        nowList: [],
        needSUM: 0,
        com: [WORK, WORK, CARRY, MOVE, MOVE],
        opt: {
            memory: {
                role: 'repairer'
            }
        }
    }, {
        type: 'repairer2',
        nowList: [],
        needSUM: 1,
        com: [WORK, WORK, CARRY, MOVE, MOVE],
        opt: {
            memory: {
                role: 'repairer2'
            }
        }
    }, {
        type: 'porter',
        nowList: [],
        needSUM: 2,
        com: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'porter'
            }
        }
    }, {
        type: 'porter2',
        nowList: [],
        needSUM: 1,
        com: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'porter2'
            }
        }
    }, {
        type: 'attack',
        nowList: [],
        needSUM: 0,
        com: [ATTACK, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'attack'
            }
        }
    }, {
        type: 'dismantle',
        nowList: [],
        needSUM: 0,
        com: [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK],
        opt: {
            memory: {
                role: 'dismantle'
            }
        }
    }, {
        type: 'claimer',
        nowList: [],
        needSUM: 1,
        com: [MOVE, CLAIM],
        opt: {
            memory: {
                role: 'claimer'
            }
        }
    }],
    towers: [{
        tower: Game.getObjectById('5cbc7e4f608847245cd9d7e7')
    }], // 塔防列表
    // 显示工蜂信息
    showWorkList(workerList) {

        var strList = '目前工蜂数量:' // 拼接字符串
        for (var i in workerList) {
            strList += ' ' + workerList[i].type + ': ' + workerList[i].nowList
        }
        console.log(strList) // 输出信息
    }
}
module.exports = Basic