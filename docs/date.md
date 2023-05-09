---
title: Date filters
order: 2
---

## dateFromNow

Return a date a certain number of days from now.

Input

```njk
{{ 5 | dateFromNow }}
```

Output

```html
2023-05-14
```

## govukDate

Convert an ISO 8601 date time to a human readable date that follows [the GOV.UK style](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#dates).

Input

```njk
{{ "2021-08-17" | govukDate }}
```

Output

```html
17 August 2021
```

You can also output a date with a truncated month:

Input

```njk
{{ "2021-08-17" | govukDate("truncate") }}
```

Output

```html
17 Aug 2021
```

To get the today’s date, pass the special word `"today"` (or `"now"`):

Input

```njk
This page was last updated on {{ "today" | govukDate }}.
```

Output

```html
This page was last updated on 22 October 2021.
```

## govukTime

Format an ISO 8601 date time or time to a human readable time that follows [the GOV.UK style](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#times).

Input

```njk
{{ "2021-08-17T00:00:31" | govukTime }}
{{ "2021-08-17T12:00:59" | govukTime }}
{{ "2021-08-17T18:30:00" | govukTime }}
```

Output

```html
midnight
midday
6:30pm
```

You can also pass in a time:

Input

```njk
{{ "08:15" | govukTime }}
```

Output

```html
8:15am
```

To get the current time, pass the special word `"now"` (or `"today"`):

Input

```njk
You submitted your application at {{ "now" | govukTime }}.
```

Output

```html
You submitted your application at 4:32pm.
```

## isoDateFromDateInput

The `govukDateInput` component stores separate values for `day`, `month` and `year` values.

When prefixed using a `namePrefix`, these values are stored with names prefixed with that value. This filter takes these prefixed values and converts them into an ISO 8601 formatted date.

Input

```js
const data = {
  `dob-day`: '01',
  `dob-month`: '02',
  `dob-year`: '2012',
}
```

```njk
{{ data | isoDateFromDateInput("dob") }}
```

Output

```html
2012-02-01
```

Combine this filter with `govukDate` to output a human readable date:

```njk
{{ data | isoDateFromDateInput("dob") | govukDate }}
```

```html
1 February 2012
```

It’s possible to configure `govukDateInput` so that only certain parts of a date are asked for, such as a month and year. You can also omit the `namePrefix` option and use individual `name` options for each value if you want to save them in a nested object. This filter also covers that use case:

```js
const data = {
  passport: {
    month: '5',
    year: '2001',
  }
}
```

```njk
{{ data.passport | isoDateFromDateInput }}
```

Output

```html
2001-05
```
