const FS = require('fs')

const path = './data'

module.exports = function(){
  console.log('读取会话信息...')
  if(!FS.existsSync(path)){
    console.log('好像是第一次启动，没有会话数据')
    return {}
  }

  const rawJson = FS.readFileSync(path, { encoding: 'utf-8' })
  try{
    console.log('会话已读取')
    return JSON.parse(rawJson)
  }catch(e){
    console.error('会话数据读取异常')
    console.error(e)
    return {}
  }
}