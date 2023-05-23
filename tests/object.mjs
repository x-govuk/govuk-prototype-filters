import test from 'ava'
import {
  isObject,
  objectToArray
} from '../lib/object.js'

test('Checks a value is the language type of `Object`', t => {
  t.true(isObject({ country: 'england' }))
  t.true(isObject(['england', 'scotland', 'wales']))
  t.false(isObject('great britain'))
})

test('Converts an object into an array, using key name as value for id', t => {
  t.deepEqual(objectToArray({
    1: { name: 'Sir Robert Walpole' },
    2: { name: 'Spencer Compton' },
    3: { name: 'Henry Pelham' }
  }), [
    { id: '1', name: 'Sir Robert Walpole' },
    { id: '2', name: 'Spencer Compton' },
    { id: '3', name: 'Henry Pelham' }
  ])
})
