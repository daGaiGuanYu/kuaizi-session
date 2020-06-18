const FS = require('fs')

process.on('exit', () => { // 程序结束时，数据持久化
  FS.writeFileSync(path, JSON.stringify(data))
})
const exit = () => process.exit()
process.on('SIGUSR2', exit) // nodemon
process.on('SIGINT', exit) // ctrl+c