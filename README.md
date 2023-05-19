# GOV.UK Prototype Filters · [![test](https://github.com/x-govuk/govuk-prototype-filters/actions/workflows/test.yml/badge.svg)](https://github.com/x-govuk/govuk-prototype-filters/actions/workflows/test.yml)

A collection of Nunjucks template filters to manipulate and transform:

* [Arrays](https://x-govuk.github.io/govuk-prototype-filters/array/)
* [Dates](https://x-govuk.github.io/govuk-prototype-filters/date/)
* [Numbers](https://x-govuk.github.io/govuk-prototype-filters/number/)
* [Objects](https://x-govuk.github.io/govuk-prototype-filters/object/)
* [Strings](https://x-govuk.github.io/govuk-prototype-filters/string/)

## Requirements

Node.js v16 or later.

## Installation

```shell
npm install @x-govuk/govuk-prototype-filters
```

## Usage with the GOV.UK Prototype Kit

GOV.UK Prototype Filters are designed to work with the GOV.UK Prototype Kit.

If you are using v13 or later of the kit, the components will be immediately available once you have installed the package, and can be [managed alongside other plugins in your prototype](https://prototype-kit.service.gov.uk/docs/install-and-use-plugins).

## Advanced usage

`@x-govuk/govuk-prototype-filters` exports an object containing all available filter functions. Using [Nunjucks’ `addFilter` method](https://mozilla.github.io/nunjucks/api.html#addfilter) you can add individual filters to your Nunjucks environment:

```js
const { slugify } = require('@x-govuk/govuk-prototype-filters')
const nunjucks = require('nunjucks')

const nunjucksEnv = nunjucks.configure(['./app/views'])

nunjucksEnv.addFilter("slugify", slugify)
```

If you are using an earlier version of the GOV.UK Prototype Kit, you can import all the filters into your `/app/filters.js` file, like so:

```diff
+ const prototypeFilters = require('@x-govuk/govuk-prototype-filters');

  module.exports = function (env) {
    /**
     * Instantiate object used to store the methods registered as a
     * 'filter' (of the same name) within nunjucks. You can override
     * gov.uk core filters by creating filter methods of the same name.
     * @type {Object}
     */
-   var filters = {}
+   var filters = prototypeFilters

    // Existing filter
    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    return filters
  }
```
