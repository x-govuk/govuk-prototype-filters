---
order: 6
title: String filters
---
<!-- markdownlint-disable no-emphasis-as-header -->

[[toc]]

## govukMarkdown

Convert a Markdown formatted string into HTML decorated with [typography classes from the GOV.UK Design System](https://design-system.service.gov.uk/styles/typography/).

**Input**

```njk
{{ "Visit [GOV.UK](https://gov.uk)." | govukMarkdown | safe }}
```

**Output**

```html
<p class="govuk-body">Visit <a class="govuk-link" href="https://www.gov.uk">GOV.UK</a>.</p>
```

### `headingsStartWith`

By default, headings start using the class `govuk-heading-xl`.

**Input**

```njk
{% set headings %}
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
{% endset %}

{{ headings | govukMarkdown | safe }}
```

**Output**

```html
<h1 class="govuk-heading-xl">Heading level 1</h1>
<h2 class="govuk-heading-l">Heading level 2</h2>
<h3 class="govuk-heading-m">Heading level 3</h3>
<h4 class="govuk-heading-s">Heading level 4</h4>
```

The [GOV.UK Design System recommends](https://design-system.service.gov.uk/styles/typography/#headings) changing this if a page feels unbalanced (heading classes don’t always need to correspond to the heading level).

Start headings using the smaller size by setting the `headingsStartWith` option:

**Input**

```njk
{{ headings | govukMarkdown(headingsStartWith="l") | safe }}
```

**Output**

```html
<h1 class="govuk-heading-l">Heading level 1</h1>
<h2 class="govuk-heading-m">Heading level 2</h2>
<h3 class="govuk-heading-s">Heading level 3</h3>
<h4 class="govuk-heading-s">Heading level 4</h4>
```

***

## isString

Check a value is classified as a [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) primitive or object.

**Input**

```njk
{{ "Number 10" | isString }}
{{ 10 | isString }}
```

**Output**

```html
true
false
```

***

## noOrphans

Add a non-breaking space between the last two words of a string.

This prevents an orphaned word appearing by itself at the end of a paragraph. This can be useful for improving the appearance of headings and titles.

**Input**

```njk
{{ "Department for Business, Energy & Industrial Strategy" | noOrphans | safe }}
```

**Output**

```html
Department for Business, Energy & Industrial&amp;nbsp;Strategy
```

***

## slugify

Convert a string into kebab-case.

This can be useful to slugify titles for use in URLs or fragment identifiers.

**Input**

```njk
{{ "Department for Education" | slugify }}
```

**Output**

```html
department-for-education
```

***

## startsWith

Check a string starts with a value.

**Input**

```njk
{{ "Department for Transport" | startsWith("Department") }}
```

**Output**

```html
true
```
