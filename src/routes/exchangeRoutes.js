const express = require('express')
const Exchange = require('../models/Exchange')
const router = express.Router()

// Route to create a new exchange
router.post('/', async (req, res) => {
  try {
    console.log('exchange - ', req.body)
    const exchange = await Exchange.create(req.body)
    res.status(201).json(exchange)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Route to retrieve all exchanges
router.get('/', async (req, res) => {
  try {
    const exchanges = await Exchange.findAll()
    res.json(exchanges)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Route to fetch a specific exchange by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const exchange = await Exchange.findById(id)
    if (exchange) {
      res.json(exchange)
    } else {
      res.status(404).json({ message: 'Exchange not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
