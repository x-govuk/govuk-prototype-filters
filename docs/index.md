---
homepage: true
includeInBreadcrumbs: true
layout: product
title: GOV.UK Prototype Filters
description: A collection of Nunjucks template filters to manipulate and transform data used in prototypes.
---

GOV.UK Prototype Filters is a collection of Nunjucks template filters to manipulate and transform:

* [Arrays](array)
* [Dates](date)
* [Numbers](number)
* [Objects](object)
* [Strings](string)

## Requirements

Node.js v16 or later.

## Installation

```shell
npm install @x-govuk/govuk-prototype-filters
```

GOV.UK Prototype Filters are designed to work with the GOV.UK Prototype Kit.

If you are using v13 or later of the kit, the components will be immediately available once you have installed the package, and can be [managed alongside other plugins in your prototype](https://prototype-kit.service.gov.uk/docs/install-and-use-plugins).

You can also [use these filters with earlier versions of the GOV.UK Prototype Kit](https://github.com/x-govuk/govuk-prototype-filters#advanced-usage), or within other projects.

## About Nunjucks filters

Variables in Nunjucks templates can be modified using filters. Filters are separated from the variable by a pipe symbol (`|`) and can have optional arguments in parentheses. Multiple filters can be chained, with the output of one filter is applied to the next.

For example, `{{ siteName | striptags | lower }}` will remove all HTML tags from the given variable and lower-case the output. If the `siteName` variable referenced the text `<p>GOV.UK</p>`, the output would be `gov.uk`.

Filters that accept arguments have parentheses around the arguments, like a function call. For example: `{{ list | join(", ") }}` will join a list with commas.

`striptags`, `title` and `join` are examples of [filters built into Nunjucks](https://mozilla.github.io/nunjucks/templating.html#builtin-filters). GOV.UK Prototype Filters provides a collection of filters that can be used alongside these.

## Contribute

The project repository is public and anyone can contribute.

[View this project on GitHub](https://github.com/x-govuk/govuk-prototype-filters).
