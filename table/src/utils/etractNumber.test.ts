import extractNumber from './extractNumber'

describe('extractNumber', () => {
  it('should extract number from string containing only numbers', () => {
    const result = extractNumber('123')
    expect(result).toBe(123)
  })

  it('should extract number from string containing numbers and other characters', () => {
    const result = extractNumber('a1b2c3')
    expect(result).toBe(123)
  })

  it('should return -1 if string contains no numbers', () => {
    const result = extractNumber('abc')
    expect(result).toBe(-1)
  })

  it('should return -1 if string is empty', () => {
    const result = extractNumber('')
    expect(result).toBe(-1)
  })
})
