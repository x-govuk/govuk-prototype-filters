const _ = require('lodash')
const GovukHTMLRenderer = require('govuk-markdown')
const { views } = require('govuk-prototype-kit')
const { marked } = require('marked')
const { markedSmartypants } = require('marked-smartypants')
const { normalize } = require('./utils.js')

/**
 * Convert a Markdown formatted string into HTML decorated with typography
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
    ...kwargs
  }

  marked.setOptions({
    ...options,
    headerIds: false, // Quieten deprecation warning in marked.js 5.x
    mangle: false, // Quieten deprecation warning in marked.js 5.x
    renderer: new GovukHTMLRenderer()
  })

  // @ts-ignore
  marked.use(markedSmartypants())

  return marked(string)
}

/**
 * Check a value is classified as a `String` primitive or object.
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
 * Convert a string into kebab-case.
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
 * Check a string starts with a value.
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
  slugify,
  startsWith
}

// Add object filters to GOV.UK Prototype Kit
views.addFilter('govukMarkdown', govukMarkdown)
views.addFilter('isString', isString)
views.addFilter('noOrphans', noOrphans)
views.addFilter('slugify', slugify)
views.addFilter('startsWith', startsWith)
