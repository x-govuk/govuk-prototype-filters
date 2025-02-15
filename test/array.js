const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const {
  arrayOrStringIncludes,
  formatList,
  isArray,
  rejectFromArray,
  selectFromArray,
  uniqueFromArray
} = require('../lib/array.js')

const array = [
  { name: 'Sally Smith', role: 'admin' },
  { name: 'David Jones', role: 'user' }
]

describe('arrayOrStringIncludes', async () => {
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
})

describe('formatList', async () => {
  it('Converts array to a string formatted as a sentence', () => {
    assert.equal(
      formatList(['England', 'Scotland', 'Wales']),
      'England, Scotland and Wales'
    )
  })

  it('Converts array to a string formatted as a sentence with disjunction', () => {
    assert.equal(
      formatList(['England', 'Scotland', 'Wales'], 'disjunction'),
      'England, Scotland or Wales'
    )
  })
})

describe('formatList', async () => {
  it('Checks value is the language type of `Object`', () => {
    assert.equal(isArray(['england', 'scotland', 'wales']), true)
    assert.equal(isArray('great britain'), false)
  })
})

describe('formatList', async () => {
  it('Rejects items in an array that have a key with a given value', () => {
    assert.deepEqual(rejectFromArray(array, 'role', 'admin'), [
      { name: 'David Jones', role: 'user' }
    ])
  })
})

describe('formatList', async () => {
  it('Selects items in an array that have a key with a given value', () => {
    assert.deepEqual(selectFromArray(array, 'role', 'admin'), [
      { name: 'Sally Smith', role: 'admin' }
    ])
  })
})

describe('uniqueFromArray', async () => {
  it('Returns array containing unique items', () => {
    assert.deepEqual(uniqueFromArray(['Orange', 'Banana', 'Apple', 'Orange']), [
      'Orange',
      'Banana',
      'Apple'
    ])
  })
})
