const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
// const compression = require('compression')

require('dotenv').config()

// Route requires
const instrumentRoutes = require('./routes/instrumentRoutes')
const candlestickRoutes = require('./routes/candlestickRoutes')
const exchangeRoutes = require('./routes/exchangeRoutes')
const syntheticDataRoutes = require('./routes/syntheticDataRoutes')

const app = express()

// Middleware
app.use(cors()) // Enable CORS
app.use(helmet()) // Set security headers
app.use(morgan('dev')) // Logging HTTP requests
app.use(express.json()) // Parse JSON bodies
// app.use(compression()) // Automatically compress HTTP responses, including SSE data, making the transmission more efficient

// Define routes
app.use('/api/instruments', instrumentRoutes)
app.use('/api/candlesticks', candlestickRoutes)
app.use('/api/exchanges', exchangeRoutes)
app.use('/stream', syntheticDataRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Serve static files
// app.use(express.static(''));

// Conditional server start
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

module.exports = app
