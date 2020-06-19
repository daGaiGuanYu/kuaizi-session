const { Server, HandleRequest } = require('kuaizi')
const { configuration, getSession } = require('../../src/index')

Server.start()

HandleRequest.get('/', ctx => {
  let session = getSession(ctx.req, ctx.res)
  console.log(session)
  session.name = 1
  return 1
})