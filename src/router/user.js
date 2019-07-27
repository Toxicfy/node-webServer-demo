const baseUrl = '/api/user'
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const { method, url } = req
  const path = url.split('?')[0]

  if (method === 'POST' && path === `${baseUrl}/login`) {
    const { username, password } = req.body
    const data = login(username, password)
    if (data) {
      return new SuccessModel(data)
    }
    return new ErrorModel('登录失败')
  }
}

module.exports = handleUserRouter
