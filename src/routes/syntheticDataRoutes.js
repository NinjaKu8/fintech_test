const express = require('express')
const router = express.Router()

const { generateCandlestickData } = require('../utils/generateData') // Utility to generate synthetic data
// const { subscriber } = require('../utils/redisPubSub') // Import Redis clients

// SSE endpoint for streaming candlestick data - update the data every 200ms, introducing rate limiting
router.get('/candlesticks', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  let lastUpdateTime = 0
  const updateThreshold = 1000 // 1 second

  const sendCandlestickData = () => {
    //   Clients receive updates at a manageable rate
    const now = Date.now()
    if (now - lastUpdateTime > updateThreshold) {
      const data = generateCandlestickData(req.query.symbol)
      res.write(`data: ${JSON.stringify(data)}\n\n`)
      lastUpdateTime = now
    }
  }

  const intervalId = setInterval(sendCandlestickData, 200)

  // Subscribe to the Redis channel
  //   const channel = 'candlestickUpdates'
  //   subscriber.subscribe(channel)

  //   const messageHandler = (message) => {
  //     res.write(`data: ${message}\n\n`)
  //   }

  //   subscriber.on('message', (channel, message) => {
  //     messageHandler(message)
  //   })

  req.on('close', () => {
    clearInterval(intervalId)
    // subscriber.unsubscribe(channel)
    // console.error('Connection was closed')
  })
})

module.exports = router
