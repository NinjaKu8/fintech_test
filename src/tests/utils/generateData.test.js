const { generateCandlestickData } = require('../../utils/generateData')

describe('generateCandlestickData', () => {
  it('generates valid candlestick data structure', () => {
    const data = generateCandlestickData()
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('symbol')
    expect(data).toHaveProperty('start_price')
  })
})
