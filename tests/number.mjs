import test from 'ava'
import {
  isNumber,
  ordinal,
  sterling
} from '../lib/number.js'

test('Checks if a value is classified as a `Number` primitive or object', t => {
  t.true(isNumber(1801))
  t.false(isNumber('1801'))
})

test('Converts a number into an ordinal numeral', t => {
  t.is(ordinal(4), 'fourth')
  t.is(ordinal(22), '22nd')
})

test('Converts a number into a string formatted as pound sterling', t => {
  t.is(sterling(81932), '£81,932')
  t.is(sterling(133.66667), '£133.67')
  t.is(sterling(75.50), '£75.50')
  t.is(sterling(75.00), '£75')
  t.is(sterling(75.00, true), '£75.00')
})
