---
title: Number filters
order: 3
---

## currency

Convert a number into a string formatted as currency.

Input

```njk
{{ 133.66667 | currency }}
{{ 75.5 | currency }}
{{ 75 | currency }}
```

Output

```html
£133.67
£75.50
£75.00
```

### Options

#### `display`

Use the `display` option to change how the currency is displayed. Accepts the following values:

* `"narrowSymbol"`: use a narrow format symbol, for example ‘$100’.
* `"symbol"`: use a localized currency symbol, for example ‘US$100’.
* `"code"`: use the ISO 4217 currency code, for example ‘USD $75.00’.
* `"name"`: use a localised currency name, for example ‘75.00 US dollars’.

Default is `"symbol"`.

Input

```njk
{{ 75 | currency(display="narrowSymbol", unit="USD") }}
{{ 75 | currency(display="symbol", unit="USD") }}
{{ 75 | currency(display="code", unit="USD") }}
{{ 75 | currency(display="name", unit="USD") }}
```

Output

```html
$75.00
US$75.00
USD $75.00
75.00 US dollars
```

#### `trailingZeros`

Use the `trailingZeros` option to show leading zeros for whole number values. Default is `true`.

> Set this option to `false` to display pounds and pence in a format that follows [the GOV.UK style for money](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#money).

Input

```njk
{{ 75.0015 | currency(trailingZeros=false) }}
```

Output

```html
£75
```

#### `unit`

Use the `unit` option to change the unit of currency. Accepts an [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217). Default is `"GBP"`.

Input

```njk
{{ 75 | currency(unit="USD") }}
```

Output

```html
US$75.00
```

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

## pluralise

Get the plural form for an item for a given number of items.

> This filter currently only works with English words.

```njk
{{ 1 | pluralise("mouse") }}
{{ 2 | pluralise("house") }}
{{ 2 | pluralise("house", { number: false }) }}
{{ 2 | pluralise("mouse", { plural: "mice" }) }}
{{ 2 | pluralise("mouse", { plural: "mice", number: false }) }}
```

Output

```html
1 mouse
2 houses
houses
2 mice
mice
```
