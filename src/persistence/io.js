const FS = require('fs')

const path = './data'

let data
function read(){
  if(data) return data

  console.log('读取会话信息...')
  if(!FS.existsSync(path)){
    console.log('好像是第一次启动，没有会话信息')
    return data = {}
  }

  const rawJson = FS.readFileSync(path, { encoding: 'utf-8' })
  try{
    console.log('会话 ok')
    return data = JSON.parse(rawJson)
  }catch(e){
    console.error('会话数据读取异常')
    console.error(e)
    return data = {}
  }
}

function write(){
  FS.writeFileSync(path, JSON.stringify(data))
}

module.exports = {
  read, write
}