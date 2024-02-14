const request = require('supertest')
const app = require('../../app')

describe('API routes for instruments', () => {
  describe('GET /api/instruments', () => {
    it('responds with a list of instruments', async () => {
      const response = await request(app).get('/api/instruments')
      expect(response.statusCode).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
    })
  })

  describe('GET /api/instruments/:symbol', () => {
    it('fetches the instrument with the specified symbol', async () => {
      const symbol = 'AAPL'
      const response = await request(app)
        .get(`/api/instruments/${symbol}`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body).toHaveProperty('symbol', symbol)
    })
  })
})
