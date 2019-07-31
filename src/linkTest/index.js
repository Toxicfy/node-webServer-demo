const mysql = require('mysql')

// 创建连接
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root_1997',
  port: 3306,
  database: 'myblog'
})

connect.connect()

// const sql = `insert into blogs (title,content,createtime,author) value ('标题B', '内容B',1564566411020, 'zhangsan')`
const sql = `SELECT * FROM blogs
`

connect.query(sql, (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
})

connect.end()