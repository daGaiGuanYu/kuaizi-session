// @ts-check
const cfg = require('../../cfg/index')
const readFile = require('./read-file')
const check = require('./check')

let data
module.exports = function(){
  if(data) return data
  const rawData = readFile()
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
      return rawData[token]
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