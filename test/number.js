const assert = require('node:assert/strict')
const { describe, it } = require('node:test')
const {
  currency,
  isNumber,
  ordinal,
  plural
} = require('../lib/number.js')

describe('Number filters', async () => {
  it('Converts number into a string formatted as currency', () => {
    assert.equal(currency(81932), '£81,932.00')
    assert.equal(currency(133.66667), '£133.67')
    assert.equal(currency(75.5), '£75.50')
    assert.equal(currency(75, { unit: 'USD' }), 'US$75.00')
    assert.equal(currency(75, { display: 'symbol', unit: 'USD' }), 'US$75.00')
    assert.equal(currency(75, { display: 'code', unit: 'USD' }), 'USD\u00A075.00')
    assert.equal(currency(75.0015, { trailingZeros: false }), '£75')
    assert.equal(currency(75, { display: 'name', trailingZeros: false, unit: 'USD' }), '75.00 US dollars')
  })

  it('Checks value is classified as a `Number` primitive or object', () => {
    assert.equal(isNumber(1801), true)
    assert.equal(isNumber('1801'), false)
  })

  it('Converts number into an ordinal numeral', () => {
    assert.equal(ordinal(4), 'fourth')
    assert.equal(ordinal(22), '22nd')
  })

  it('Gets the plural word form for an item for a given number', () => {
    assert.equal(plural(1, 'mouse'), '1 mouse')
    assert.equal(plural(2, 'mouse'), '2 mice')
    assert.equal(plural(2, 'mouse', { showNumber: false }), 'mice')
  })
})
