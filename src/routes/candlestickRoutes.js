const express = require('express')
const Candlestick = require('../models/Candlestick')
const router = express.Router()

// Route to create a new candlestick entry
router.post('/', async (req, res) => {
  try {
    const candlestick = await Candlestick.create(req.body)
    res.status(201).json(candlestick)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Route to retrieve candlestick data by the specific symbol
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params
    const candlesticks = await Candlestick.findBySymbol(symbol)
    if (candlesticks.length > 0) {
      // res.setHeader('Content-Type', 'text/event-stream')
      res.json(candlesticks)
    } else {
      res.status(404).json({
        message: 'No candlestick data found for the specified symbol',
      })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
