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

/**
 * 创建新博客
 */
const newBlog = (blogData = {}) => {
  // blogData 是客户端传入的数据(通过我们处理过的post data), 包含author，content，title
  const { author, content, title } = blogData
  const createTime = Date.now()

  const sql = `INSERT INTO blogs (author,content,title,createTime) VALUES ('${author}','${content}','${title}',${createTime});`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content

  const sql = `UPDATE blogs SET title='${title}', content='${content}' WHERE id='${id}'`

  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })

  // 表示更新成功
  return true
}

const delBlog = id => {
  const sql = `DELETE FROM blogs WHERE id='${id}'; `
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
