const env = process.env.NODE_ENV

let MYSQL_CONF

MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'Root_1997',
  port: '3306',
  database: 'myblog'
}

module.exports = {
  MYSQL_CONF
}
