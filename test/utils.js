const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const { normalize } = require('../lib/utils.js')

describe('normalize', async () => {
  it('Normalises value provided to a filter', () => {
    assert.equal(normalize('Dollars', 'Pounds'), 'Dollars')
    assert.equal(normalize(undefined, 'Pounds'), 'Pounds')
  })
})
