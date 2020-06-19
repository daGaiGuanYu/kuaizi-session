# kuaizi-session
[node](https://nodejs.org/en/) web 后端的会话管理  
跟[筷子](https://github.com/daGaiGuanYu/kuaizi)没有依赖关系，只是理念一致  

# 使用
## 安装
```bash
npm install kuaizi-session
```

### 在筷子中的应用
```javascript
const { Server, HandleRequest } = require('kuaizi')
const { getSession } = require('kuaizi-session')

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
```
### 原生应用
```javascript
const Http = require('http')
const { getSession } = require('kuaizi-session')

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
```
