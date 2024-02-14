const http = require('http')
const app = require('../app')

describe('SSE Endpoint', () => {
  let server
  let req

  beforeAll((done) => {
    server = app.listen(0, done) // Dynamically allocate a port
  })

  afterAll((done) => {
    if (req) req.abort() // Abort the request to close the connection
    server.close(done)
  })

  it('should connect and receive a 200 status', (done) => {
    jest.setTimeout(10000) // Extend timeout if necessary

    const url = `http://localhost:${server.address().port}/stream/candlesticks`
    req = http.get(url, (res) => {
      expect(res.statusCode).toEqual(200)

      res.on('data', (chunk) => {
        done() // Complete the test when data is received or after a timeout
      })

      setTimeout(() => {
        req.abort() // Close the connection if no data is received within a timeout
        done()
      }, 10000) // Set a timeout to abort the connection and end the test
    })
  })
})
