---
order: 2
title: Array filters
---

<!-- markdownlint-disable no-emphasis-as-header -->

[[toc]]

## formatList

Convert an array into a string formatted as a sentence.

**Input**

```njk
{{ ["England", "Scotland", "Wales"] | formatList }}
```

**Output**

```html
England, Scotland and Wales
```

To format the list using a disjunction:

**Input**

```njk
{{ ["England", "Scotland", "Wales"] | formatList("disjunction") }}
```

**Output**

```html
England, Scotland or Wales
```

---

## includes

Tests whether an array includes an item given, and returns true or false.

**Input**

```njk
{{ ['Orange', 'Banana', 'Apple'] | includes('Orange') }}
{{ ['Orange', 'Banana', 'Apple'] | includes('Pear') }}
```

**Output**

```html
true
false
```

---

## isArray

Check a value is classified as an [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) object.

**Input**

```njk
{{ ["england", "scotland", "wales"] | isArray }}
{{ "great britain" | isArray }}
```

**Output**

```html
true
false
```

---

## rejectFromArray

Reject items in an array that have a key with a given value.

**Input**

```njk
{{ [{
  name: "Sally Smith",
  role: "admin"
}, {
  name: "David Jones",
  role: "user"
}] | rejectFromArray("role", "admin") | dump }}
```

**Output**

```html
[{
  name: "David Jones",
  role: "user"
}]
```

---

## selectFromArray

Select items in an array that have a key with a given value.

**Input**

```njk
{{ [{
  name: "Sally Smith",
  role: "admin"
}, {
  name: "David Jones",
  role: "user"
}] | selectFromArray("role", "admin") | dump }}
```

**Output**

```html
[{
  name: "Sally Smith",
  role: "admin"
}]
```

---

## uniqueFromArray

Return unique items from an array.

**Input**

```njk
{{ ['Orange', 'Banana', 'Apple', 'Orange'] | uniqueFromArray }}
```

**Output**

```html
[Orange, Banana, Apple]
```
