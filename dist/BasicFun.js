var basicFun = {

    // 显示工蜂信息
    showWorkList(workerList) {
        
        var strList = '目前工蜂数量:' // 拼接字符串
        for (var i in workerList) {
            strList += ' ' + workerList[i].type + ': ' + workerList[i].nowList.length
        }
        console.log(strList) // 输出信息
    }
}

module.exports = basicFun