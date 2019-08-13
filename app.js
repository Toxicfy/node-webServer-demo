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

  // 解析 cookie 并赋值给 req
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const itemArr = item.split('=')
    const key = itemArr[0].trim()
    const value = itemArr[1].trim()

    req.cookie[key] = value
  })

  getPostData(req).then(postData => {
    // 获取到对应的post data数据并赋值给req.body
    req.body = postData

    // 经过处理的返回数据
    let handleBlogData = handleBlogRouter(req, res)
    if (req.url.includes('/api/blog')) {
      handleBlogData.then(blogData => {
        res.end(JSON.stringify(blogData))
      })
      return
    }

    const userResult = handleUserRouter(req, res)
    if (req.url.includes('/api/user')) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 not found')
    res.end()
  })
})

server.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
