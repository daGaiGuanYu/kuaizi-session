// 配置

let TokenName = 'token' // 存储在前端 cookie 里的 session 标识
let Warranty = 2*60*60*1000 // 会话过期时间

module.exports = {
  get TokenName (){
    return TokenName
  },
  set TokenName (nv){
    if(nv.constructor != String)
      throw Error('TokenName 只支持 String 类型')
    TokenName = nv
  },
  get Warranty() {
    return Warranty
  },
  set Warranty(nv) {
    let hour = nv/1000/60/60
    console.log(`会话过期时间已设置为 ${hour} 小时`)
    Warranty = nv
  }
}