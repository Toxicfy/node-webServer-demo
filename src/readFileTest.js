const fs = require('fs')
const path = require('path')

const readFile = fileName => {
  return new Promise((resolve, reject) => {
    //  获取到路径
    const fullName = path.resolve(__dirname, 'router', fileName)

    //
    fs.readFile(fullName, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(data)
    })
  })
}

readFile('user.js')
  .then(data => {
    console.log(data.toString())
    return readFile('blog.js')
  })
    .then(res => {
      console.log(res)
  })
