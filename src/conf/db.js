const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'Root_1997',
  port: '3306',
  database: 'myblog'
}

REDIS_CONF = {
  port: '6379',
  host: '127.0.0.1'
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
