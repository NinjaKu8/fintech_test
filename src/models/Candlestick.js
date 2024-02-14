const pool = require('../db')

class Candlestick {
  static async create({
    symbol,
    start_price,
    highest_price,
    lowest_price,
    end_price,
    volume,
  }) {
    const { rows } = await pool.query(
      'INSERT INTO candles (symbol, start_price, highest_price, lowest_price, end_price, volume) VALUES ($1, $2, $3, $4, $5, $6) RETURNING symbol, start_price, highest_price, lowest_price, end_price, volume',
      [symbol, start_price, highest_price, lowest_price, end_price, volume]
    )
    return rows[0]
  }

  static async findBySymbol(symbol) {
    const { rows } = await pool.query(
      'SELECT * FROM candles WHERE symbol = $1 ORDER BY date_time ASC',
      [symbol]
    )
    return rows
  }
}

module.exports = Candlestick
