import { strict as assert } from 'node:assert'
import { describe, it } from 'node:test'
import {
  arrayOrStringIncludes,
  formatList,
  isArray,
  rejectFromArray,
  selectFromArray,
  uniqueFromArray
} from '../lib/array.js'

describe('Array filters', async () => {
  const array = [
    { name: 'Sally Smith', role: 'admin' },
    { name: 'David Jones', role: 'user' }
  ]

  it('Returns true if an array includes item given', () => {
    assert.equal(
      arrayOrStringIncludes(['Orange', 'Banana', 'Apple'], 'Orange'),
      true
    )
  })

  it('Returns false if an array does not include item given', () => {
    assert.equal(
      arrayOrStringIncludes(['Orange', 'Banana', 'Apple'], 'Pear'),
      false
    )
  })

  it('Converts array to a string formatted as a sentence', () => {
    assert.equal(
      formatList(['England', 'Scotland', 'Wales']),
      'England, Scotland and Wales'
    )
    assert.equal(
      formatList(['England', 'Scotland', 'Wales'], 'disjunction'),
      'England, Scotland or Wales'
    )
  })

  it('Checks value is the language type of `Object`', () => {
    assert.equal(isArray(['england', 'scotland', 'wales']), true)
    assert.equal(isArray('great britain'), false)
  })

  it('Rejects items in an array that have a key with a given value', () => {
    assert.deepEqual(
      rejectFromArray(array, 'role', 'admin'),
      [{ name: 'David Jones', role: 'user' }]
    )
  })

  it('Selects items in an array that have a key with a given value', () => {
    assert.deepEqual(
      selectFromArray(array, 'role', 'admin'),
      [{ name: 'Sally Smith', role: 'admin' }]
    )
  })

  it('Returns array containing unique items', () => {
    assert.deepEqual(
      uniqueFromArray(['Orange', 'Banana', 'Apple', 'Orange']),
      ['Orange', 'Banana', 'Apple']
    )
  })
})
