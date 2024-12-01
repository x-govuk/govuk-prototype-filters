---
order: 5
title: Object filters
---

<!-- markdownlint-disable no-emphasis-as-header -->

[[toc]]

## isObject

Check a value is the language type of [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object).

**Input**

```njk
{{ { country: "england" } | isObject }}
{{ ["england", "scotland", "wales"] | isObject }}
{{ "great britain" | isObject }}
```

**Output**

```html
true
true
false
```

---

## objectToArray

Convert an object into an array, using each object’s key as the value for `id`.

**Input**

```njk
{{ {
  "a": { name: "Sir Robert Walpole" },
  "b": { name: "Spencer Compton" },
  "c": { name: "Henry Pelham" }
} | objectToArray | dump }}
```

**Output**

Using [Nunjucks’ built-in `dump` filter](https://mozilla.github.io/nunjucks/templating.html#dump) to render the result as a string:

```html
[
  { id: "a", name: "Sir Robert Walpole" },
  { id: "b", name: "Spencer Compton" },
  { id: "c", name: "Henry Pelham" },
]
```
