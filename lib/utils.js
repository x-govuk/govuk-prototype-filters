/**
 * Get value at path of object.
 *
 * @template T
 * @param {object|null|undefined} object - Object to query
 * @param {string|Array<string|number>} path - Path of the property to get
 * @param {T} [defaultValue] - Value returned if resolved value is undefined
 * @returns {unknown|T} Resolved value
 */
function get(object, path, defaultValue) {
  if (!path) return undefined

  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)

  const result = pathArray?.reduce(
    (previousObj, key) => previousObj && previousObj[key],
    object
  )

  return result === undefined ? defaultValue : result
}

/**
 * Normalise value. Checks that a given value exists before performing
 * a transformation.
 *
 * @template T
 * @template U
 * @param {T} value - Input value
 * @param {U} defaultValue - Value to fall back to if no value given
 * @returns {T|U} `value` if it exists, otherwise `defaultValue`
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
