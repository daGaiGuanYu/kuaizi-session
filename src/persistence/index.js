// @ts-check
const FS = require('fs')
const cfg = require('../cfg/index')
const readFile = require('./read-file')
const check = require('./check')
const sessionFilePath = require('./session-file-path')

let data
let rawData
module.exports = function(){
  if(data) return data
  rawData = readFile()
  check(rawData) // 去掉过期的会话
  
  return data = new Proxy(rawData, {
    get(rawData, token){ // 用 token 获取会话数据
      if(!token||!rawData[token]) return
      
      // 重置过期时间
      rawData[token].startTime = new Date()
      clearTimeout(rawData[token].timeoutId)
      rawData[token].timeoutId = setTimeout(function(){
        delete rawData[token]
      }, cfg.Warranty)
      return rawData[token].session
    },
    set(rawData, token, session){ // 新会话
      rawData[token] = {
        session,
        startTime: new Date(),
        timeoutId: setTimeout(function(){
          delete rawData[token]
        }, cfg.Warranty)
      }
      return true
    }
  })
}

process.on('exit', () => { // 程序结束时，数据持久化
  // 删除 timeout 属性
  for(let key in rawData)
    delete rawData[key].timeoutId
  FS.writeFileSync(sessionFilePath, JSON.stringify(rawData))
})
const exit = () => process.exit()
process.on('SIGUSR2', exit) // nodemon
process.on('SIGINT', exit) // ctrl+c