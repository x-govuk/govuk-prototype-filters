---
title: Number filters
order: 3
---

## isNumber

Checks if a value is classified as a [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) primitive or object.

Input

```njk
{{ 1801 | isNumber }}
{{ "1801" | isNumber }}
```

Output

```html
true
false
```

## ordinal

Convert a number into an ordinal numeral that follows [the GOV.UK style](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#ordinal-numbers).

Input

```njk
{{ 4 | ordinal }}
{{ 22 | ordinal }}
```

Output

```html
fourth
22nd
```

## sterling

Convert a number into a string formatted as pound sterling and that follows [the GOV.UK style](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#money).

Input

```njk
{{ 81932 | sterling }}
{{ 133.66667 | sterling }}
{{ 75.50 | sterling }}
{{ 75.00 | sterling }}
```

Output

```html
£81,932
£133.67
£75.50
£75
```

The GOV.UK style guide recommends not using decimals unless pence are included. If you always want to use decimals (for example, to help compare values in a table), include `true` in the filter’s parameter:

```njk
{{ 75.00 | sterling(true) }}
```

Output

```html
£75.00
```
