const cfg = require('../cfg/index')

// 去掉过期的会话
module.exports = function(data){
  let now = new Date()
  for(let token in data){
    data[token].startTime = new Date(data[token].startTime)
    let timeLeft = cfg.Warranty - (now - data[token].startTime) // 剩余时间 = 总时间 减 己过多长时间
    if(timeLeft < 1)
      delete data[token]
    else
      data[token].timeoutId = setTimeout(function(){
        delete data[token]
      }, timeLeft)
  }
}