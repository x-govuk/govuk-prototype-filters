const { views } = require('govuk-prototype-kit')
const _ = require('lodash')
const { normalize } = require('./utils.js')

/**
 * Convert array to a list formatted as a sentence.
 *
 * @example
 * formatList(['England', 'Scotland', 'Wales'])
 * // England, Scotland and Wales
 *
 * @example
 * formatList(['England', 'Scotland', 'Wales'], 'disjunction')
 * // England, Scotland or Wales
 *
 * @param {Array} array - Array to convert
 * @param {string} [type=conjunction] - Format of output
 * @returns {string} Formatted list
 */
function formatList (array, type = 'conjunction') {
  array = normalize(array, '')

  const listFormat = new Intl.ListFormat('en-GB', {
    style: 'long',
    type
  })
  return listFormat.format(array)
}

/**
 * Check if a value is classified as an `Array` object.
 *
 * @example
 * isArray(['england', 'scotland', 'wales']) // true
 *
 * @example
 * isArray('great britain') // false
 *
 * @param {*} value - Value to check
 * @returns {boolean} Returns `true` if `value` is an array, else `false`
 */
function isArray (value) {
  value = normalize(value, '')

  return _.isArray(value)
}

/**
 * Reject items in an array that have a key with a given value.
 *
 * @example
 * rejectFromArray([{
 *   name: 'Sally Smith'
 *   role: 'admin'
 * }, {
 *   name: 'David Jones'
 *   role: 'user'
 * }], 'role', 'admin')
 *
 * // [{
 * //  name: 'David Jones'
 * //  role: 'user'
 * // }]
 *
 * @param {Array} array - Array to filter
 * @param {string} key - Key to filter on
 * @param {string} value - Value to filter by
 * @returns {Array} Filtered array
 */
function rejectFromArray (array, key, value) {
  value = [].concat(value) // Force to Array

  return array.filter(item => !value.includes(_.get(item, key)))
}

/**
 * Select items in an array that have a key with a given value.
 *
 * @example
 * selectFromArray([{
 *   name: 'Sally Smith'
 *   role: 'admin'
 * }, {
 *   name: 'David Jones'
 *   role: 'user'
 * }], 'role', 'admin')
 *
 * // [{
 * //  name: 'Sally Smith'
 * //  role: 'admin'
 * // }]
 *
 * @param {Array} array - Array to filter
 * @param {string} key - Key to filter on
 * @param {string} value - Value to filter by
 * @returns {Array} Filtered array
 */
function selectFromArray (array, key, value) {
  value = [].concat(value) // Force to Array

  return array.filter(item => value.includes(_.get(item, key)))
}

module.exports = {
  formatList,
  isArray,
  rejectFromArray,
  selectFromArray
}

// Add array filters to GOV.UK Prototype Kit
views.addFilter('formatList', formatList)
views.addFilter('isArray', isArray)
views.addFilter('rejectFromArray', rejectFromArray)
views.addFilter('selectFromArray', selectFromArray)
