const { views } = require('govuk-prototype-kit')
const _ = require('lodash')
const pluralize = require('pluralize')

const { normalize } = require('./utils.js')

/**
 * Convert number into a string formatted as a currency
 *
 * @example currency(81932) // £81,932
 * @example currency(133.66667) // £133.67
 * @example currency(75.5) // £75.50
 * @example currency(75, { format: 'code' }) // GBP 75.00
 * @example currency(75, { trailingZeroIfInteger: false }) // £75
 * @example currency(75, { unit: 'USD' }) // $75.00
 * @param {number} number - Value to convert
 * @param {object} [kwargs] - Keyword arguments
 * @param {'symbol'|'code'|'name'| 'narrowSymbol'} [kwargs.display] - Currency display
 * @param {boolean} [kwargs.trailingZeros] - Include trailing .00
 * @param {string} [kwargs.unit] - Currency unit
 * @returns {string} `number` formatted as currency
 */
function currency(number, kwargs) {
  number = normalize(number, '')

  const options = {
    display: 'symbol',
    trailingZeros: true,
    unit: 'GBP',
    ...kwargs
  }

  let currency = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: options.unit,
    currencyDisplay: /** @type {'symbol'|'code'|'name'|'narrowSymbol'} */ (
      options.display
    )
  }).format(number)

  /**
   * TODO: Use options.trailingZeroDisplay once this package requires Node v20
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#trailingzerodisplay}
   */
  if (!options.trailingZeros) {
    currency = currency.replace(/\.00$/, '')
  }

  return currency
}

/**
 * Check value is classified as a `Number` primitive or object
 *
 * @example isNumber(1801) // true
 * @example isNumber('1801') // false
 * @param {*} value - Value to check
 * @returns {boolean} Returns `true` if `value` is a number, else `false`
 */
function isNumber(value) {
  value = normalize(value, '')

  return _.isNumber(value)
}

/**
 * Convert number into an ordinal numeral
 *
 * @see {@link https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#ordinal-numbers}
 * @example ordinal(4) // fourth
 * @example ordinal(22) // 22nd
 * @param {number} number - Value to convert
 * @returns {string} Ordinal numeral or `number` with an ordinal suffix
 */
function ordinal(number) {
  number = normalize(number, '')

  // Spell out first to ninth
  if (number < 10) {
    const ordinals = new Map([
      [1, 'first'],
      [2, 'second'],
      [3, 'third'],
      [4, 'fourth'],
      [5, 'fifth'],
      [6, 'sixth'],
      [7, 'seventh'],
      [8, 'eighth'],
      [9, 'ninth']
    ])

    return `${ordinals.get(number)}`
  }

  // After that use 10th, 11th and so on
  const rule = new Intl.PluralRules('en-GB', {
    type: 'ordinal'
  }).select(number)
  const suffixes = new Map([
    ['one', 'st'],
    ['two', 'nd'],
    ['few', 'rd'],
    ['other', 'th']
  ])
  const suffix = suffixes.get(rule)

  return `${number}${suffix}`
}

/**
 * Get the plural form for an item for a given number of items.
 * Works for English words only.
 *
 * @example plural(1, 'mouse') // 1 mouse
 * @example plural(2, 'mouse') // 2 mice
 * @example plural(2, 'mouse', { showNumber: false }) // mice
 * @param {number} number - Number of items
 * @param {string} singular - Singular form
 * @param {object} [kwargs] - Keyword arguments
 * @param {boolean} [kwargs.showNumber] - Show number alongside word
 * @returns {string} Plural word form for `number`
 */
function plural(number, singular, kwargs) {
  number = normalize(number, '')

  const options = {
    showNumber: true,
    ...kwargs
  }

  return pluralize(singular, number, options.showNumber)
}

module.exports = {
  currency,
  isNumber,
  ordinal,
  plural
}

// Add number filters to GOV.UK Prototype Kit
views.addFilter('currency', currency)
views.addFilter('isNumber', isNumber)
views.addFilter('ordinal', ordinal)
views.addFilter('plural', plural)
