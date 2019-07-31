const { exec } = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
  let sql = `SELECT * FROM blogs WHERE 1=1 `
  if (author) {
    sql += `AND author='${author}' `
  }
  if (keyword) {
    sql += `AND title LIKE %'${keyword}'% `
  }
  sql += `ORDER BY createTime desc;`
  return exec(sql)
}

// 获取博客详细内容
const getDetail = id => {
  let sql = `SELECT * FROM blogs WHERE id='${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
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
