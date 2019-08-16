const fs = require('fs')
const path = require('path')

// 创建写入
function createWriteStream(fileName) {
  const fullFilePath = path.join(__dirname, '../../logs', fileName)
  const options = {
    flags: 'a'
  }
  return fs.createWriteStream(fullFilePath, options)
}

// 写入日志文件
const accessWriteStream = createWriteStream('access.log')

function writeLogs(writeStream, log) {
  writeStream.write(`${log}\n`)
}

function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}
