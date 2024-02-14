const pool = require('../db')

class Exchange {
  static async create({ symbol, ticker, currency, isin, type, name, country }) {
    const { rows } = await pool.query(
      'INSERT INTO exchanges (symbol, ticker, currency, isin, type, name, country) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING symbol, ticker, currency, isin, type, name, country',
      [symbol, ticker, currency, isin, type, name, country]
    )
    return rows[0]
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM exchanges')
    return rows
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM exchanges WHERE id = $1', [
      id,
    ])
    if (rows.length > 0) {
      return rows[0]
    } else {
      return null
    }
  }
}

module.exports = Exchange
