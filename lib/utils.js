/**
 * Normalise a value. Checks that a given value exists before performing
 * a transformation.
 *
 * @param {*} value - Input value
 * @param {*} defaultValue - Value to fallback to if no value given
 * @returns {*} defaultValue
 */
function normalize (value, defaultValue) {
  if (value === null || value === undefined || value === false) {
    return defaultValue
  }

  return value
}

module.exports = {
  normalize
}
