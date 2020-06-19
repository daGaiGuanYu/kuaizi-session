const { Server, HandleRequest } = require('kuaizi')
const { getSession } = require('../../src/index')

Server.start()

HandleRequest.get('/', ctx => {
  let session = getSession(ctx.req, ctx.res)
  session.name = '小明'
  return 666
})

HandleRequest.get('/who', ctx => {
  let session = getSession(ctx.req, ctx.res)
  let name = session.name
  if(name)
    return '你就是小明吧'
  else
    return '您谁？'
})