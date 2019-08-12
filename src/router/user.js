const baseUrl = '/api/user'
const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, url } = req
  const path = url.split('?')[0]

  if (method === 'POST' && path === `${baseUrl}/login`) {
    const { username, password } = req.body
    const data = loginCheck(username, password)
    console.log(username,password)
    return data.then(res => {
      if (res.username) {
        return new SuccessModel()
      }
      return new ErrorModel('用户登录失败')
    })
  }
}

module.exports = handleUserRouter
