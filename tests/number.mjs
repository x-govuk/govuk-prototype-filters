import test from 'ava'
import {
  currency,
  isNumber,
  ordinal,
  pluralise
} from '../lib/number.js'

test('Converts a number into a string formatted as currency', t => {
  t.is(currency(81932), '£81,932.00')
  t.is(currency(133.66667), '£133.67')
  t.is(currency(75.5), '£75.50')
  t.is(currency(75, { unit: 'USD' }), 'US$75.00')
  t.is(currency(75, { display: 'symbol', unit: 'USD' }), 'US$75.00')
  t.is(currency(75, { display: 'code', unit: 'USD' }), 'USD\u00A075.00')
  t.is(currency(75.0015, { trailingZeros: false }), '£75')
  t.is(currency(75, {
    display: 'name',
    trailingZeros: false,
    unit: 'USD',
  }), '75.00 US dollars')
})

test('Checks if a value is classified as a `Number` primitive or object', t => {
  t.true(isNumber(1801))
  t.false(isNumber('1801'))
})

test('Converts a number into an ordinal numeral', t => {
  t.is(ordinal(4), 'fourth')
  t.is(ordinal(22), '22nd')
})

test('Gets the plural form for an item for a given number of items', t => {
  t.is(pluralise(1, 'mouse'), '1 mouse')
  t.is(pluralise(2, 'house'), '2 houses')
  t.is(pluralise(2, 'house', { number: false }), 'houses')
  t.is(pluralise(2, 'mouse', { plural: 'mice' }), '2 mice')
  t.is(pluralise(2, 'mouse', { plural: 'mice', number: false }), 'mice')
})
