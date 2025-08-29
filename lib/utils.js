/**
 * Get value at path of object.
 *
 * @param {object|null|undefined} object - Object to query
 * @param {string|Array<string|number>} path - Path of the property to get
 * @param {*} [value] - Value returned if resolved value is undefined
 * @returns {*} Resolved value
 */
function get(object, path, value) {
  if (!path) return undefined

  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  const result = pathArray.reduce(
    (previousObj, key) => previousObj && previousObj[key],
    object
  )

  return result === undefined ? value : result
}

/**
 * Normalise value. Checks that a given value exists before performing
 * a transformation.
 *
 * @param {*} value - Input value
 * @param {*} defaultValue - Value to fallback to if no value given
 * @returns {*} defaultValue
 */
function normalize(value, defaultValue) {
  if (value === null || value === undefined || value === false) {
    return defaultValue
  }

  return value
}

module.exports = {
  get,
  normalize
}
