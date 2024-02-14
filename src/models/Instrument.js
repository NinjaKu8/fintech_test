const pool = require('../db')

class Instrument {
  static async create({ symbol, exchange_id, name, type, isin }) {
    const { rows } = await pool.query(
      'INSERT INTO instruments (symbol, exchange_id, name, type, isin) VALUES ($1, $2, $3, $4, $5) RETURNING symbol, exchange_id, name, type, isin',
      [symbol, exchange_id, name, type, isin]
    )
    return rows[0]
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM instruments')
    return rows
  }

  static async findBySymbol(symbol) {
    const { rows } = await pool.query(
      'SELECT * FROM instruments WHERE symbol = $1',
      [symbol]
    )
    return rows[0]
  }
}

module.exports = Instrument
