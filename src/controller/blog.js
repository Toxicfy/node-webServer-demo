const getList = (author, keyword) => {
  return [
    {
      id: 1,
      author: 'tom',
      title: '文章1',
      content: '内容1',
      createTime: ''
    },
    {
      id: 2,
      author: 'tom',
      title: '文章2',
      content: '内容2',
      createTime: ''
    }
  ]
}

const getDetail = id => {
  return {
    id: 1,
    author: 'tom',
    title: '文章1',
    content: '内容1',
    createTime: ''
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是客户端传入的数据(通过我们处理过的post data)
  return {
    id: Math.random() * 10
  }
}

const updateBlog = (id, blogData = {}) => {
  // 表示更新成功
  return true
}

const delBlog = id => {
  console.log(id)
  // 数据删除成功
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
