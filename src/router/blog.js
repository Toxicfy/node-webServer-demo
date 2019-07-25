const {
  getList,
  getDetail,
  newBlog,
  updateBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const baseUrl = '/api/blog'

const handleBlogRouter = (req, res) => {
  // 获取基本参数
  const { method, url } = req
  const { id } = req.query
  const path = url.split('?')[0]

  // 获取博客详情列表
  if (method === 'GET' && path === `${baseUrl}/list`) {
    const { author, keyword } = req.query
    const listData = getList(author, keyword)
    if (listData.length > 0) {
      return new SuccessModel(listData)
    }
  }
  // 博客详情
  if (method === 'GET' && path === `${baseUrl}/detail`) {
    const detailData = getDetail(id)
    if (detailData) {
      return new SuccessModel(detailData)
    }
  }

  // 删除博客
  if (method === 'POST' && path === `${baseUrl}/del`) {
    return {
      msg: 'this is blog del api'
    }
  }

  // 新增博客
  if (method === 'POST' && path === `${baseUrl}/new`) {
    // req.body 是进入之前解析客户端的数据获得
    const data = newBlog(req.body)
    if (data) {
      return new SuccessModel(data)
    }
  }

  // 更新博客
  if (method === 'POST' && path === `${baseUrl}/update`) {
    const data = updateBlog(id, req.body) //此处返回Boolean
    if (data) {
      return SuccessModel()
    } else {
      return ErrorModel('更新失败')
    }
  }
}

module.exports = handleBlogRouter
