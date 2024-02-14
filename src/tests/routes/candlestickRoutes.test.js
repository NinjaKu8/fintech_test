const request = require('supertest')
const app = require('../../app')

describe('API routes for exchanges', () => {
  describe('POST /api/candlesticks', () => {
    it('adds new candlestick data for an instrument', async () => {
      const newCandlestickData = {
        symbol: 'AAPL',
        start_price: '150.0',
        highest_price: '157.0',
        lowest_price: '149.0',
        end_price: '155.0',
        volume: '100000',
      }

      const response = await request(app)
        .post('/api/candlesticks')
        .send(newCandlestickData)
        .expect('Content-Type', /json/)
        .expect(201)

      expect(response.body).toMatchObject({
        ...newCandlestickData,
      })
    })
  })

  describe('GET /api/candlesticks/:symbol', () => {
    it('retrieves candlestick data for a given symbol', async () => {
      const symbol = '18MS.XETRA'
      const response = await request(app)
        .get(`/api/candlesticks/${symbol}`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
    })
  })
})
