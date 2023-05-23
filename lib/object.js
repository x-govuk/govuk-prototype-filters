const { views } = require('govuk-prototype-kit')
const _ = require('lodash')
const { normalize } = require('./utils.js')

/**
 * Check a value is the language type of `Object`.
 *
 * @example
 * isObject({country: 'england'}) // true
 *
 * @example
 * isObject(['england', 'scotland', 'wales']) // true
 *
 * @example
 * isObject('great britain') // false
 *
 * @param {*} value - Value to check
 * @returns {boolean} Returns `true` if `value` is an object, else `false`
 */
function isObject (value) {
  value = normalize(value, '')

  return _.isObject(value)
}

/**
 * Convert an object into an array, using key name as value for id.
 *
 * @example
 * objectToArray({
 *   1: { name: 'Sir Robert Walpole' },
 *   2: { name: 'Spencer Compton' },
 *   3: { name: 'Henry Pelham' },
 * })
 *
 * // [
 * //   { id: 1, name: 'Sir Robert Walpole' },
 * //   { id: 2, name: 'Spencer Compton' },
 * //   { id: 3, name: 'Henry Pelham' },
 * // ]
 *
 * @param {object} object - Object to transform
 * @returns {Array<object>} Array of object values
 */
function objectToArray (object) {
  const objectArray = []
  Object.keys(object).forEach(key => objectArray.push({
    ...{ id: key },
    ...object[key]
  }))

  return objectArray
}

module.exports = {
  isObject,
  objectToArray
}

// Add object filters to GOV.UK Prototype Kit
views.addFilter('isObject', isObject)
views.addFilter('objectToArray', objectToArray)
