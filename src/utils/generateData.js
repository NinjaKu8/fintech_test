const crypto = require('crypto')

exports.generateCandlestickData = (symbol) => {
  // Generate a random ID for the candlestick data
  const id = crypto.randomBytes(16).toString('hex')

  //   const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB']
  //   const symbol = symbols[Math.floor(Math.random() * symbols.length)]

  const dateTime = new Date().toISOString()
  const startPrice = parseFloat((Math.random() * 100 + 100).toFixed(2))
  const endPrice = parseFloat((startPrice + Math.random() * 10 - 5).toFixed(2))
  const highestPrice = parseFloat(
    Math.max(startPrice, endPrice, startPrice + Math.random() * 10).toFixed(2)
  )
  const lowestPrice = parseFloat(
    Math.min(startPrice, endPrice, startPrice - Math.random() * 10).toFixed(2)
  )
  const volume = Math.floor(Math.random() * 10000)
  const source = 'Synthetic Data'
  const candleTypes = ['BULLISH', 'BEARISH']
  const candleType = candleTypes[Math.floor(Math.random() * candleTypes.length)]
  const currency = 'USD'

  return {
    id,
    symbol,
    date_time: dateTime,
    start_price: startPrice,
    highest_price: highestPrice,
    lowest_price: lowestPrice,
    end_price: endPrice,
    volume,
    source,
    candle_type: candleType,
    currency,
  }
}
