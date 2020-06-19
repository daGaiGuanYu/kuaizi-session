const Cookie = require('cookie')

const { read } = require('../persistence/read/index')
const cfg = require('../cfg/index')

const data = read()

module.exports = function(req, res){
  let token = getTokenFromRequest(req)
  if(!token||data[token])
    data[token] = {}
  return data[token]
}

function getTokenFromRequest(req){
  let cookieObj = Cookie.parse(req.headers.cookie||'')
  return cookieObj[cfg.TokenName]
}