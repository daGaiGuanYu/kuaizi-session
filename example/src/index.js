const { Server, HandleRequest } = require('kuaizi')
const { configuration, getSession } = require('../../src/index')

configuration.TokenName = 'haha'
configuration.Warranty = 30 *1000
Server.start()

HandleRequest.get('/', ctx => {
  let session = getSession(ctx.req, ctx.res)
  session.name = '小明'
  return 1
})

HandleRequest.get('/who', ctx => {
  let session = getSession(ctx.req, ctx.res)
  return session.name || '不认识'
})