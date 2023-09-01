import test from 'ava'
import {
  arrayOrStringIncludes,
  formatList,
  isArray,
  rejectFromArray,
  selectFromArray,
  uniqueFromArray
} from '../lib/array.js'

test.before(t => {
  t.context.array = [
    { name: 'Sally Smith', role: 'admin' },
    { name: 'David Jones', role: 'user' }
  ]
})

test('Returns true if an array includes item given', t => {
  t.true(
    arrayOrStringIncludes(['Orange', 'Banana', 'Apple'], 'Orange')
  )
})

test('Returns false if an array does not include item given', t => {
  t.false(
    arrayOrStringIncludes(['Orange', 'Banana', 'Apple'], 'Pear')
  )
})

test('Converts an array to a string formatted as a sentence', t => {
  t.is(
    formatList(['England', 'Scotland', 'Wales']),
    'England, Scotland and Wales'
  )
  t.is(
    formatList(['England', 'Scotland', 'Wales'], 'disjunction'),
    'England, Scotland or Wales'
  )
})

test('Checks a value is the language type of `Object`', t => {
  t.true(isArray(['england', 'scotland', 'wales']))
  t.false(isArray('great britain'))
})

test('Rejects items in an array that have a key with a given value', t => {
  t.deepEqual(rejectFromArray(t.context.array, 'role', 'admin'), [{
    name: 'David Jones',
    role: 'user'
  }])
})

test('Selects items in an array that have a key with a given value', t => {
  t.deepEqual(selectFromArray(t.context.array, 'role', 'admin'), [{
    name: 'Sally Smith',
    role: 'admin'
  }])
})

test('Returns an array containing unique items', t => {
  t.deepEqual(
    uniqueFromArray(['Orange', 'Banana', 'Apple', 'Orange']),
    ['Orange', 'Banana', 'Apple']
  )
})
