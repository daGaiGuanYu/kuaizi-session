const { Server, HandleRequest } = require('kuaizi')
const { configuration, getSession } = require('../../src/index')

configuration.TokenName = 'haha'
configuration.Warranty = 30 *1000
Server.start()

HandleRequest.get('/', ctx => {
  let session = getSession(ctx.req, ctx.res)
  console.log(session)
  session.name = 1
  return 1
})