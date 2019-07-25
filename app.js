const http = require('http')
const querystring = require('querystring')

// 路由控制
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理post data
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    // 处理传入的chunk数据
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json')
  req.query = querystring.parse(req.url.split('?')[1]) // 解析url参数

  getPostData(req).then(postData => {
    // 获取到对应的post data数据并赋值给req.body
    req.body = postData

    // 经过处理的返回数据
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
      res.end(JSON.stringify(blogData))
    }
    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(JSON.stringify(userData))
    }
  })
})

server.listen(8000, () => {
  console.log('server is running at http://localhost:8000')
})
