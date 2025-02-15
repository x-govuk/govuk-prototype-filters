---
order: 3
title: Date filters
---

<!-- markdownlint-disable no-emphasis-as-header -->

[[toc]]

## daysAgo

Return how many days ago a date was.

If the date is today, the number 0 is returned. If the date is in the future, a negative number of days will be returned.

**Input**

```njk
{# Current datetime is 2023-05-06T09:00:59 #}
{{ "2023-05-04" | daysAgo }}
```

**Output**

```html
2
```

This can be useful within conditions to determine whether a date is in the past or the future:

```njk
{% set leftDaysAgo = data | isoDateFromDateInput("leavingDate") | daysAgo %}

{% if leftDaysAgo > 0 %}
  They left the organisation on
  {{ data | isoDateFromDateInput("leavingDate") | govukDate }}.
{% elif leftDaysAgo == 0 %}
  They are leaving the organisation today.
{% else %}
  They will be leaving the organisation on
  {{ data | isoDateFromDateInput("leavingDate") | govukDate }}.
{% end %}
```

It can also be combined with [`plural`](/number#plural) to show the number of days ago:

**Input**

```njk
Case opened {{ data | isoDateFromDateInput("opened") | daysAgo | plural("day") }} ago.
```

**Output**

```html
Case opened 1 day ago
Case opened 2 days ago
```

---

## duration

Return a date a certain number of days from another date.

**Input**

```njk
{{ "2023-05-11" | duration(5) }}
```

**Output**

```html
2023-05-16T00:00:00.000+01:00
```

A second parameter can be used to change the unit used to increment the date by. Accepts `"days"`, `"weeks"`, `"months"` or `"years"`. Default is `"days"`:

**Input**

```njk
{{ "2023-05-11" | duration(5, "weeks") }}
{{ "2023-05-11" | duration(5, "months") }}
{{ "2023-05-11" | duration(5, "years") }}
```

**Output**

```html
2023-06-15T00:00:00.000+01:00
2023-10-11T00:00:00.000+01:00
2028-05-11T00:00:00.000+01:00
```

To return a date from today’s date, pass the special word `"today"` (or `"now"`):

**Input**

```njk
{# Current datetime is 2023-05-06T09:00:59 #}
{{ "today" | duration(5) }}
```

**Output**

```html
2023-05-11T09:00:59
```

---

## govukDate

Convert an ISO 8601 date string into a human readable date that follows [the GOV.UK style](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#dates).

**Input**

```njk
{{ "2021-08-17T18:30:00" | govukDate }}
```

**Output**

```html
17 August 2021
```

> This filter only outputs a date. If you want to output the date and time from an ISO 8601 date string, use [`govukDateTime`](#govukdatetime).

To get the today’s date, pass the special word `"today"` (or `"now"`):

**Input**

```njk
This page was last updated on {{ "today" | govukDate }}.
```

**Output**

```html
This page was last updated on 21 October 2021.
```

### `truncate`

Use the `truncate` option to use a truncated month name. Default is `false`.

**Input**

```njk
{{ "2021-08-17" | govukDate(truncate=true) }}

// "truncate" is deprecated, and will be removed in v2.0
{{ 3 | govukDate("truncate") }}
```

**Output**

```html
17 Aug 2021
```

---

## govukTime

Format an ISO 8601 date string or time to a human readable time that follows [the GOV.UK style](https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#times).

**Input**

```njk
{{ "2021-08-17T00:00:31" | govukTime }}
{{ "2021-08-17T12:00:59" | govukTime }}
{{ "2021-08-17T18:30:00" | govukTime }}
```

**Output**

```html
12am (midnight)
12pm (midday)
6:30pm
```

You can also pass in a time:

**Input**

```njk
{{ "08:15" | govukTime }}
```

**Output**

```html
8:15am
```

To get the current time, pass the special word `"now"` (or `"today"`):

**Input**

```njk
You submitted your application at {{ "now" | govukTime }}.
```

**Output**

```html
You submitted your application at 10:45am.
```

---

## govukDateTime

Convert an ISO 8601 date string into a human readable date and time that follows the GOV.UK style.

**Input**

```njk
{{ "2021-08-17T18:30:00" | govukDateTime }}
```

**Output**

```html
17 August 2021 at 6:30pm
```

To get the current date and time, pass the special word `"now"` (or `"today"`):

**Input**

```njk
This page was last updated on {{ "now" | govukDateTime }}.
```

**Output**

```html
This page was last updated on 21 October 2021 at 10:45am.
```

If the date doesn’t include a time, only the date will be output:

**Input**

```njk
{{ "2021-08-17" | govukDateTime }}
```

**Output**

```html
17 August 2021
```

If only a time is given, only a time will be output:

**Input**

```njk
{{ "18:30" | govukDateTime }}
```

**Output**

```html
6:30pm
```

### `timeFirst`

Use the `timeFirst` option to show the time before the date. Default is `false`.

**Input**

```njk
{{ "2021-08-17T18:30:00" | govukDateTime(timeFirst=true) }}

// "on" is deprecated, and will be removed in v2.0
{{ 3 | govukDateTime("on") }}
```

**Output**

```html
6:30pm on 17 August 2021
```

### `truncate`

Use the `truncate` option to use a truncated month name. Default is `false`.

**Input**

```njk
{{ "2021-08-17T18:30:00" | govukDateTime(truncate=true) }}

// "truncate" is deprecated, and will be removed in v2.0
{{ 3 | govukDateTime("truncate") }}
```

**Output**

```html
17 Aug 2021 at 6:30pm
```

---

## isoDateFromDateInput

The `govukDateInput` component stores separate values for `day`, `month` and `year` values.

When prefixed using a `namePrefix`, these values are stored with names prefixed with that value. This filter takes these prefixed values and converts them into an ISO 8601 formatted date.

**Input**

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

**Output**

```html
2012-02-01
```

Combine this filter with `govukDate` to output a human readable date:

**Input**

```njk
{{ data | isoDateFromDateInput("dob") | govukDate }}
```

**Output**

```html
1 February 2012
```

It’s possible to configure `govukDateInput` so that only certain parts of a date are asked for, such as a month and year. You can also omit the `namePrefix` option and use individual `name` options for each value if you want to save them in a nested object. This filter covers that use case:

**Input**

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

**Output**

```html
2001-05
```

The filter also accepts month names written out in full or abbreviated form (for example, ‘january’ or ‘jan’) as some users may enter months in this way:

```js
const data = {
  expires: {
    day: '23',
    month: 'april',
    year: '2024',
  }
}
```

```njk
{{ data.expires | isoDateFromDateInput }}
```

**Output**

```html
2024-04-23
```

---

## monthName

Convert a number (between 1 and 12) into the name of the corresponding month.

**Input**

```njk
{{ 3 | monthName }}
```

**Output**

```html
March
```

### `truncate`

Use the `truncate` option to use a truncated month name:

**Input**

```njk
{{ 3 | monthName(truncate=true) }}

// "truncate" is deprecated, and will be removed in v2.0
{{ 3 | monthName("truncate") }}
```

**Output**

```html
Mar
```
