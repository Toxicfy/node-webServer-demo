const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const baseUrl = '/api/blog'

// 验证登录
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

//
const handleBlogRouter = (req, res) => {
  // 获取基本参数
  const { method, url } = req
  const { id } = req.query
  const path = url.split('?')[0]

  // 获取博客详情列表
  if (method === 'GET' && path === `${baseUrl}/list`) {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    const { author, keyword } = req.query
    return getList(author, keyword).then(listData => {
      if (listData.length > 0) {
        return new SuccessModel(listData)
      }
    })
  }

  // 博客详情
  if (method === 'GET' && path === `${baseUrl}/detail`) {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    return getDetail(id).then(detailData => {
      if (detailData) {
        return new SuccessModel(detailData)
      }
    })
  }

  // 删除博客
  if (method === 'POST' && path === `${baseUrl}/del`) {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    const data = delBlog(id)
    return data.then(res => {
      if (res) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除失败')
      }
    })
  }

  // 新增博客
  if (method === 'POST' && path === `${baseUrl}/new`) {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    // req.body 是进入之前解析客户端的数据获得
    req.body.author = req.session.username
    const newBlogData = newBlog(req.body)
    return newBlogData.then(res => {
      if (res) {
        return new SuccessModel(res)
      }
    })
  }

  // 更新博客
  if (method === 'POST' && path === `${baseUrl}/update`) {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    const data = updateBlog(id, req.body) //此处返回Boolean
    return data.then(res => {
      if (res) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新失败')
      }
    })
  }
}

module.exports = handleBlogRouter
