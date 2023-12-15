const _ = require('lodash')
const { views } = require('govuk-prototype-kit')
const { marked } = require('marked')
const markedGovukMarkdown = require('govuk-markdown')
const { markedSmartypants } = require('marked-smartypants')
const { normalize } = require('./utils.js')

/**
 * Convert Markdown formatted string into HTML decorated with typography
 * classes from the GOV.UK Design System.
 * @see {@link https://design-system.service.gov.uk/styles/typography/}
 * @example govukMarkdown('Visit [GOV.UK](https://gov.uk).') // <p class='govuk-body'>Visit <a class='govuk-link' href='https://www.gov.uk'>GOVUK</a>.</p>
 * @param {string} string - Value to convert
 * @param {object} [kwargs] - Keyword arguments
 * @returns {string|Promise<string>} `string` rendered as HTML
 */
function govukMarkdown(string, kwargs) {
  string = normalize(string, '')

  marked.use(
    markedGovukMarkdown({
      headingsStartWith: 'xl',
      ...kwargs
    })
  )

  marked.use(markedSmartypants())

  return marked(string)
}

/**
 * Check value is classified as a `String` primitive or object.
 * @example isString('Number 10') // true
 * @example isString(10) // false
 * @param {*} value - Value to check
 * @returns {boolean} Returns `true` if `value` is a string, else `false`
 */
function isString(value) {
  value = normalize(value, '')

  return _.isString(value)
}

/**
 * Insert non-breaking space between the last two words of a string. This
 * prevents an orphaned word appearing by itself at the end of a paragraph.
 * @example noOrphans('Cabinet Office') // Cabinet&nbspOffice
 * @param {string} string - Value to transform
 * @returns {string} `string` with non-breaking space inserted
 */
function noOrphans(string) {
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
 * Convert string into kebab-case.
 * @example slugify('Department for Education') // department-for-education
 * @param {string} string - Value to convert
 * @returns {string} `string` in kebab-case
 */
function slugify(string) {
  string = normalize(string, '')

  return _.kebabCase(string)
}

/**
 * Check string starts with a value.
 * @example startsWith('Department of Transport', 'Department') // true
 * @param {string} string - String to check
 * @param {string} value - Value to check against
 * @returns {boolean} Returns `true` if `string` starts with `value`, else `false`
 */
function startsWith(string, value) {
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
views.addFilter('govukMarkdown', govukMarkdown, { renderAsHtml: true })
views.addFilter('isString', isString)
views.addFilter('noOrphans', noOrphans, { renderAsHtml: true })
views.addFilter('slugify', slugify)
views.addFilter('startsWith', startsWith)
