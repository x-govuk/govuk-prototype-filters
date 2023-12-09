import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import { normalize } from '../lib/utils.js'

describe('Utilities', async () => {
  it('Normalises value provided to a filter', () => {
    assert.equal(normalize('Dollars', 'Pounds'), 'Dollars')
    assert.equal(normalize(undefined, 'Pounds'), 'Pounds')
  })
})
