const { write } = require('./io')

process.on('exit', write) // 程序结束时，数据持久化
const exit = () => process.exit()
process.on('SIGUSR2', exit) // nodemon
process.on('SIGINT', exit) // ctrl+c