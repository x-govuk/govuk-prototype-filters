const _ = require('lodash')
const GovukHTMLRenderer = require('govuk-markdown')
const { views } = require('govuk-prototype-kit')
const { marked } = require('marked')
const { normalize } = require('./utils.js')

/**
 * Convert a Markdown formatted string to HTML decorated with typography
 * classes from the GOV.UK Design System.
 *
 * @see {@link https://design-system.service.gov.uk/styles/typography/}
 *
 * @example
 * govukMarkdown('Visit [GOV.UK](https://gov.uk).') // <p class="govuk-body">Visit <a class="govuk-link" href="https://www.gov.uk">GOVUK</a>.</p>
 *
 * @param {string} string - Value to convert
 * @param {object} [kwargs] - Keyword arguments
 * @returns {string} `string` rendered as HTML
 */
function govukMarkdown (string, kwargs) {
  string = normalize(string, '')

  const options = {
    headingsStartWith: 'xl',
    smartypants: true,
    ...kwargs
  }

  marked.setOptions({
    ...options,
    renderer: new GovukHTMLRenderer()
  })

  return marked(string)
}

/**
 * Check if a value is classified as a `String` primitive or object.
 *
 * @example
 * isString('Number 10') // true
 *
 * @example
 * isString(10) // false
 *
 * @param {*} value - Value to check
 * @returns {boolean} Returns `true` if `value` is a string, else `false`
 */
function isString (value) {
  value = normalize(value, '')

  return _.isString(value)
}

/**
 * Get the plural form for an item for a given number of items.
 * Works for English words only.
 *
 * @see {@link http://blog.gnclmorais.com/simple-pluralise-in-javascript}
 *
 * @example
 * pluralise(1, 'mouse') // 1 mouse
 * pluralise(2, 'house') // 2 houses
 * pluralise(2, 'house', { number: false }) // houses
 * pluralise(2, 'mouse', { plural: 'mice' }) // 2 mice
 * pluralise(2, 'mouse', { plural: 'mice', number: false }) // mice
 *
 * @param {number} count - Number of items
 * @param {string} singular - Singular form
 * @param {object} [options={}] - Options
 * @param {string} [options.plural] - Plural form
 * @param {boolean} [options.number] - Output number alongside word
 * @returns {string} Plural form for `count`
 */
function pluralise (count, singular, { plural, number } = {}) {
  const message = count === 1 ? singular : (plural || `${singular}s`)

  return number === false ? message : `${count} ${message}`
}

/**
 * Insert a non-breaking space between the last two words of a string. This
 * prevents an orphaned word appearing by itself at the end of a paragraph.
 *
 * @example
 * noOrphans('Department for Education') // Department for&nbsp;Education
 *
 * @param {string} string - Value to transform
 * @returns {string} `string` with non-breaking space inserted
 */
function noOrphans (string) {
  string = normalize(string, '')

  const indexOfLastSpace = string.lastIndexOf(' ')

  // If there’s only one word, we don’t need this filter
  if (indexOfLastSpace === -1) {
    return string
  }

  const begin = string.substring(0, indexOfLastSpace)
  const end = string.substring(indexOfLastSpace + 1)
  return `${begin}&nbsp;${end}`
}

/**
 * Convert a string to kebab-case.
 *
 * @example
 * slugify('Department for Education') // department-for-education
 *
 * @param {string} string - Value to convert
 * @returns {string} `string` in kebab-case
 */
function slugify (string) {
  string = normalize(string, '')

  return _.kebabCase(string)
}

/**
 * Check if a string starts with a value.
 *
 * @example
 * startsWith('Department of Transport', 'Department') // true
 *
 * @param {string} string - String to check
 * @param {string} value - Value to check against
 * @returns {boolean} Returns `true` if `string` starts with `value`, else `false`
 */
function startsWith (string, value) {
  string = normalize(string, '')

  return string.startsWith(value)
}

module.exports = {
  govukMarkdown,
  isString,
  noOrphans,
  pluralise,
  slugify,
  startsWith
}

// Add object filters to GOV.UK Prototype Kit
views.addFilter('govukMarkdown', govukMarkdown)
views.addFilter('isString', isString)
views.addFilter('noOrphans', noOrphans)
views.addFilter('pluralise', pluralise)
views.addFilter('slugify', slugify)
views.addFilter('startsWith', startsWith)
