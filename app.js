const http = require('http')
const querystring = require('querystring')
// 路由控制
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
// redis
const { get, set } = require('./src/db/redis')

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

// 获取 cookie 的过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60)
  console.log('d.toGMTString() is ', d.toGMTString())
  return d.toGMTString()
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

  // 解析session并存到redis
  let needSetCookie = false
  let userId = req.cookie.userid // 客户端cookie存储的标识
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化session，存入redis
    set(userId, {})
  } else {
    // 通过userId去redis数据库查询对于的value
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
      if (sessionData == null) {
        set(req.sessionId, {})
        req.session = {}
      } else {
        req.session = sessionData
      }
    })
  }

  getPostData(req).then(postData => {
    // 获取到对应的post data数据并赋值给req.body
    req.body = postData

    // 经过处理的返回博客数据
    const handleBlogData = handleBlogRouter(req, res)
    if (req.url.includes('/api/blog')) {
      handleBlogData.then(blogData => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          )
        }
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 经过处理的返回用户数据
    const userResult = handleUserRouter(req, res)
    if (req.url.includes('/api/user')) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader(
            'Set-Cookie',
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          )
        }
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 处理404
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.write('404 not found')
    res.end()
  })
})

server.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
