/**
 * 通用对象
 */
var Basic = {
    MotherBase: Game.spawns['MotherBase'], // 母基地
    thisRoom: Game.rooms['W16N49'],
    leftRoom: Game.rooms['W17N49'],
    workerList: [{
        type: 'miner',
        needSUM: 0,
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
        needSUM: 0,
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
        type: 'left_miner',
        needSUM: 1,
        nowList: [],
        com: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        opt: {
            memory: {
                role: 'left_miner',
                working: true
            }
        }
    }, {
        type: 'minerS',
        needSUM: 1,
        nowList: [],
        com: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'minerS',
                working: true
            }
        }
    }, {
        type: 'left_minerS',
        needSUM: 1,
        nowList: [],
        com: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'left_minerS',
                working: true
            }
        }
    }, {
        type: 'miner2S',
        needSUM: 1,
        nowList: [],
        com: [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'miner2S',
                working: true
            }
        }
    }, {
        type: 'upgrader',
        nowList: [],
        needSUM: 2,
        com: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'upgrader',
                working: false
            }
        }
    }, {
        type: 'left_upgrader',
        nowList: [],
        needSUM: 2,
        com: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'left_upgrader',
                working: false
            }
        }
    }, {
        type: 'builder',
        nowList: [],
        needSUM: 0,
        com: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
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
        type: 'porter',
        nowList: [],
        needSUM: 0,
        com: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'porter',
                almost_Dead: false
            }
        }
    }, {
        type: 'porterS',
        nowList: [],
        needSUM: 1,
        com: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'porterS',
                almost_Dead: false
            }
        }
    }, {
        type: 'left_porterS',
        nowList: [],
        needSUM: 1,
        com: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
        opt: {
            memory: {
                role: 'left_porterS',
                almost_Dead: false
            }
        }
    }, {
        type: 'porter2',
        nowList: [],
        needSUM: 1,
        com: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
        opt: {
            memory: {
                role: 'porter2',
                almost_Dead: false
            }
        }
    }, {
        type: 'attack',
        nowList: [],
        needSUM: 2,
        com: [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE],
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
        needSUM: 0,
        com: [MOVE, CLAIM],
        opt: {
            memory: {
                role: 'claimer'
            }
        }
    }, {
        type: 'test',
        nowList: [],
        needSUM: 0,
        com: [MOVE],
        opt: {
            memory: {
                role: 'test'
            }
        }
    }],
    towers: [{
        tower: Game.getObjectById('5cbc7e4f608847245cd9d7e7')
    }, {
        tower: Game.getObjectById('5cc73a0a97acd17724322714')
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