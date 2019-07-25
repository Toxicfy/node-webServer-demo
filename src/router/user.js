const baseUrl = '/api/user'

const handleUserRouter = (req, res) => {
  const { method, url } = req
  const path = url.split('?')[0]

  if (method === 'POST' && path === `${baseUrl}/login`) {
    return {
      msg: 'this is login api'
    }
  }
}

module.exports = handleUserRouter
