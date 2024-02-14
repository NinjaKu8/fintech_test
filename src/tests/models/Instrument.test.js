const pool = require('../../db')
const Instrument = require('../../models/Instrument')

beforeAll(async () => {
  await pool.query(
    'CREATE TEMPORARY TABLE instruments AS SELECT * FROM instruments LIMIT 0;'
  )
})

afterAll(async () => {
  await pool.end()
})

describe('Instrument Model', () => {
  it('should create a new instrument', async () => {
    const newInstrument = await Instrument.create({
      symbol: 'AAPL',
      name: 'Apple Inc.',
      type: 'Stock',
      isin: 'US0378331005',
    })
  })

  it('should find all instruments', async () => {
    const instruments = await Instrument.findAll()
    expect(instruments).toBeInstanceOf(Array)
  })

  it('should find an instrument by symbol', async () => {
    const instrument = await Instrument.findBySymbol('AAPL')
    expect(instrument).toHaveProperty('symbol', 'AAPL')
  })
})
