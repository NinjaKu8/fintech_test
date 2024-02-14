const request = require('supertest')
const app = require('../../app')

describe('API routes for exchanges', () => {
  describe('GET /api/exchanges', () => {
    it('retrieves a list of all exchanges', async () => {
      const response = await request(app)
        .get('/api/exchanges')
        .expect('Content-Type', /json/)
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
    })
  })

  describe('GET /api/exchanges/:id', () => {
    it('fetches a specific exchange by ID', async () => {
      const exchangeId = 4

      const response = await request(app)
        .get(`/api/exchanges/${exchangeId}`)
        .expect('Content-Type', /json/)
        .expect(200)

      expect(response.body).toHaveProperty('id', exchangeId)
      expect(response.body).toMatchObject({
        symbol: expect.any(String),
        ticker: expect.any(String),
        code: expect.any(String),
        isin: expect.any(String),
        type: expect.any(String),
        name: expect.any(String),
        country: expect.any(String),
        currency: expect.any(String),
        operating_mic: expect.any(String),
        code_exchange: expect.any(String),
      })
    })
  })
})
