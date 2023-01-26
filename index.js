const arrayFilters = require('./lib/array.js')
const dateFilters = require('./lib/date.js')
const numberFilters = require('./lib/number.js')
const objectFilters = require('./lib/object.js')
const stringFilters = require('./lib/string.js')

// Export Nunjucks filter functions
module.exports = {
  ...arrayFilters,
  ...dateFilters,
  ...numberFilters,
  ...objectFilters,
  ...stringFilters
}
