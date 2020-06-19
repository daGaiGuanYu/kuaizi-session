const Cookie = require('cookie')
const getUniqueString = require('simple-unique-string')

const { read } = require('../persistence/read/index')
const cfg = require('../cfg/index')

const data = read()

module.exports = function(req, res){
  let token = getTokenFromRequest(req)
  let result // 先用 result 暂存 session 对象，否则，每取一次 data[token] 会触发 proxy 的 getter
  
  if(!token) // 连 token 都没有
    token = getUniqueString()
  if(!data[token]) // token 过期
    result = data[token] = {}
  else // token 正常
    result = data[token]

  putCookie(res, token) // 放\更新 前端 cookie
  return result
}

function getTokenFromRequest(req){
  let cookieObj = Cookie.parse(req.headers.cookie||'')
  return cookieObj[cfg.TokenName]
}
function putCookie(res, token){
  let expireAt = new Date().getTime() + cfg.Warranty
  expireAt = new Date(expireAt).toUTCString()
  res.setHeader('Set-Cookie', `${cfg.TokenName}=${token};path=/;httpOnly;expires=${expireAt}`)
}