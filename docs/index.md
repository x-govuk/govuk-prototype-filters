---
homepage: true
includeInBreadcrumbs: true
layout: product
title: GOV.UK Prototype Filters
description: A collection of Nunjucks template filters to manipulate and transform data used in prototypes.
---

Variables in Nunjucks templates can be modified using filters. Filters are separated from the variable by a pipe symbol (`|`) and can have optional arguments in parentheses. Multiple filters can be chained, with the output of one filter is applied to the next.

For example, `{{ siteName | striptags | lower }}` will remove all HTML tags from the given variable and lower-case the output. If the `siteName` variable referenced the text `<p>GOV.UK</p>`, the output would be `gov.uk`.

Filters that accept arguments have parentheses around the arguments, like a function call. For example: `{{ list | join(", ") }}` will join a list with commas.

`striptags`, `title` and `join` are examples of [filters built into Nunjucks](https://mozilla.github.io/nunjucks/templating.html#builtin-filters). GOV.UK Prototype Filters provides a collection of filters that can be used alongside these:

* [Array filters](array)
* [Date filters](date)
* [Number filters](number)
* [Object filters](object)
* [String filters](string)
