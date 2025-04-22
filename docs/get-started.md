---
layout: sub-navigation
order: 1
title: Get started
---

## Requirements

Node.js v22 or later.

## Installation

To install, in your terminal type:

```shell
npm install @x-govuk/govuk-prototype-filters
```

If you are using version 13 or later of the GOV.UK Prototype Kit, the filters will be immediately available for use in Nunjucks templates.

The plugin can be [managed alongside other plugins in your prototype](https://prototype-kit.service.gov.uk/docs/install-and-use-plugins).

### Using with earlier versions of the Prototype Kit

If you are using an earlier version of the Prototype Kit, import the filters into `/app/filters.js`:

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

## Advanced usage

`@x-govuk/govuk-prototype-filters` exports an object containing all filter functions.

Using [Nunjucks’ `addFilter` method](https://mozilla.github.io/nunjucks/api.html#addfilter) you can add individual filters to your Nunjucks environment:

```js
const { slugify } = require('@x-govuk/govuk-prototype-filters')
const nunjucks = require('nunjucks')

const nunjucksEnv = nunjucks.configure(['./app/views'])

nunjucksEnv.addFilter("slugify", slugify)
```
