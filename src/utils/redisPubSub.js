const { createClient } = require('redis')

// Connect to Redis
const redisUrl = 'redis://localhost:6379'
const publisher = createClient({ url: redisUrl })
const subscriber = createClient({ url: redisUrl })

const connectRedis = async () => {
  await publisher.connect()
  await subscriber.connect()
  console.log('Connected to Redis')
}

connectRedis().catch(console.error)

module.exports = { publisher, subscriber }
