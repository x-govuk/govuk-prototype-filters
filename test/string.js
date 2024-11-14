const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const { arrayOrStringIncludes } = require('../lib/array.js')
const {
  govukMarkdown,
  isString,
  noOrphans,
  slugify,
  startsWith
} = require('../lib/string.js')

describe('String filters', async () => {
  it('Converts Markdown formatted string to HTML', () => {
    assert.equal(
      govukMarkdown('He said, -- "A \'simple\' sentence..." --- unknown'),
      '<p class="govuk-body">He said, &#8211; &#8220;A &#8216;simple&#8217; sentence&#8230;&#8221; &#8212; unknown</p>\n'
    )
    assert.equal(
      govukMarkdown('# Large heading', { headingsStartWith: 'l' }),
      '<h1 class="govuk-heading-l" id="large-heading">Large heading</h1>'
    )
  })

  it('Checks value is classified as a `String`', () => {
    assert.equal(isString('Number 10'), true)
    assert.equal(isString(10), false)
  })

  it('Inserts non-breaking space between the last two words of a string', () => {
    assert.equal(
      noOrphans('Department for Education'),
      'Department for&nbsp;Education'
    )
    assert.equal(noOrphans('Government'), 'Government')
  })

  it('Converts string to kebab-case', () => {
    assert.equal(
      slugify('Department for Education'),
      'department-for-education'
    )
  })

  it('Checks string starts with a value', () => {
    assert.equal(startsWith('Department of Transport', 'Department'), true)
  })

  it('Returns true if a string includes string given', () => {
    assert.equal(arrayOrStringIncludes('Oranges are great', 'Orange'), true)
  })

  it('Returns false if a string does not include string given', () => {
    assert.equal(arrayOrStringIncludes('Oranges are great', 'Apple'), false)
  })
})
