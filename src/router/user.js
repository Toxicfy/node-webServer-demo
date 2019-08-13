const baseUrl = '/api/user'
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, url } = req
  const path = url.split('?')[0]

  if (method === 'GET' && path === `${baseUrl}/login`) {
    const { username, password } = req.body

    const data = login(username, password)
    return data.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname

        return new SuccessModel()
      }
      return new ErrorModel('用户登录失败')
    })
  }

  // if (method === 'GET' && path === '/api/user/login-test') {
  //   console.log(req.cookie)
  //   if (req.cookie.username) {
  //     return Promise.resolve(new SuccessModel())
  //   } else {
  //     return Promise.resolve(new ErrorModel('登录失败'))
  //   }
  // }
}

module.exports = handleUserRouter
