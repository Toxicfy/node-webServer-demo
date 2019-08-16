const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建redis客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

// 设置 redis
function set(key, val) {
  if (typeof value === Object) {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}
// 异步读取redis
function get(key) {
  return new Promise((resolve, reject) => {
    // promise
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (error) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}
