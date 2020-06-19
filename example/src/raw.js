const Http = require('http')
const { getSession } = require('../../src/index')

Http.createServer( (req, res) => {
  let session = getSession(req, res)
  let name = session.name
  if(!name){
    console.log('我不认识你，但是我现在给你起个名字叫小明，不要换浏览器，换了浏览器我又不认识你了')
    session.name = '小明'
  }else{
    console.log('你就是小明吧')
  }

  res.end('666')
}).listen(8080)