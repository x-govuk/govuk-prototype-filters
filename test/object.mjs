import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import {
  isObject,
  objectToArray
} from '../lib/object.js'

describe('Object filters', async () => {
  it('Checks value is the language type of `Object`', () => {
    assert.equal(isObject({ country: 'england' }), true)
    assert.equal(isObject(['england', 'scotland', 'wales']), true)
    assert.equal(isObject('great britain'), false)
  })

  it('Converts object into an array, using key name as value for id', () => {
    assert.deepEqual(objectToArray({
      1: { name: 'Sir Robert Walpole' },
      2: { name: 'Spencer Compton' },
      3: { name: 'Henry Pelham' }
    }), [
      { id: '1', name: 'Sir Robert Walpole' },
      { id: '2', name: 'Spencer Compton' },
      { id: '3', name: 'Henry Pelham' }
    ])
  })
})
