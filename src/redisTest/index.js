const redis = require('redis')

//
const redisClient = redis.createClient(6379, '127.0.0.1')

redisClient.on('error', err => {
  console.error(err)
})

redisClient.set('testKey', 'testValue', redis.print)

redisClient.get('testKey', (err, val) => {
  if (err) {
    console.err(err)
    return
  }
  console.log('val:', val)
  redisClient.quit()
})
