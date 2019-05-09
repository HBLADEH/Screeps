var basicFun = {
    /**
     * [doHarvest 采矿操作] 
     * @param  {[type]} creep  [蠕虫对象]
     * @param  {[type]} target [矿源]
     * @param  {[type]} opt    [moveTo的参数]
     * @return {[type]}        [description]
     */
    doHarvest(creep, target, opt) {
        if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, opt)
        }
    },
    /**
     * [doTransfer 存物品操作]
     * @param  {[type]} creep  [蠕虫对象]
     * @param  {[type]} target [要存到的地方]
     * @param  {[type]} resourceType    [要存的物品的类型]
     * @param  {[type]} opt    [moveTo的参数]
     * @return {[type]}        [description]
     */
    doTransfer(creep, target, resourceType, opt) {
        if (creep.transfer(target, resourceType) == ERR_NOT_IN_RANGE) { // 存矿
            creep.moveTo(target, opt)
        }
    },
    /**
     * [doWithdraw 取物品]
     * @param  {[type]} creep        [蠕虫对象]
     * @param  {[type]} target       [要取的对象]
     * @param  {[type]} resourceType [要取的物品的类型]
     * @param  {[type]} amount       [取的数量]
     * @param  {[type]} opt          [moveTo的参数]
     * @return {[type]}              [description]
     */
    doWithdraw(creep, target, resourceType, amount, opt) {
        if (creep.withdraw(target, resourceType, amount) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, opt)
        }
    },
    /**
     * [doUpgradeController 升级]
     * @param  {[type]} creep      [蠕虫对象]
     * @param  {[type]} controller [controller 对象]
     * @param  {[type]} opt        [moveTo的参数]
     * @return {[type]}            [description]
     */
    doUpgradeController(creep, controller, opt) {
        if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) { // 执行升级 Controller 操作,如果离 Controller 较远, 则向 Controller 移动
            creep.moveTo(controller, opt)
        }
    },
    toRoom(creep, roomName, opt) {
        const exitDir = creep.room.findExitTo(roomName)
        const exit = creep.pos.findClosestByRange(exitDir)
        creep.moveTo(exit, opt)
    }
}

module.exports = basicFun