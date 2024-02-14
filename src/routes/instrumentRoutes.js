const express = require('express')
const Instrument = require('../models/Instrument')
const router = express.Router()

// Route to create a new financial instrument
router.post('/', async (req, res) => {
  try {
    const instrument = await Instrument.create(req.body)
    res.status(201).json(instrument)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Route to retrieve all financial instruments
router.get('/', async (req, res) => {
  try {
    const instruments = await Instrument.findAll()
    res.json(instruments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Route to retrieve a single financial instrument by its symbol
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params
    const instrument = await Instrument.findBySymbol(symbol)
    if (instrument) {
      res.json(instrument)
    } else {
      res.status(404).json({ message: 'Instrument not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
