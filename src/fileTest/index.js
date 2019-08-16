const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'a.txt')

// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   // data 为二进制
//   console.log(data.toString())
// })
let opt = {
  flag: 'a' //append 追加文件，w->覆盖写入
}
const content = '\n这是新写入的内容\n'
fs.writeFile(fileName, content, opt, err => {})
setTimeout(() => {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    // data 为二进制
    console.log(data.toString())
  })
}, 1000)

// // 写入文件

// const opt = {
//     flag: 'a'  // 追加写入。覆盖用 'w'
// }
// fs.writeFile(fileName, content, opt, (err) => {
//     if (err) {
//         console.error(err)
//     }
// })

// // 判断文件是否存在
// fs.exists(fileName, (exist) => {
//     console.log('exist', exist)
// })
