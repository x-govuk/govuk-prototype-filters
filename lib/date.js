const { views } = require('govuk-prototype-kit')
const { DateTime, Duration, Settings } = require('luxon')

const { plural } = require('./number.js')
const { normalize } = require('./utils.js')

Settings.defaultLocale = 'en-GB'
Settings.throwOnInvalid = true

/**
 * Returns a person’s age with reference to the NHS.UK content guide
 * Returns weeks until 6 months old.
 * Returns months until 2 years old.
 * Returns years above 2 years old.
 *
 * @see {@link https://service-manual.nhs.uk/content/inclusive-content/age}
 * @param {string} string - Date
 * @param {object} [kwargs] - Keyword arguments
 * @returns {string} Age in weeks, months or years
 */
function age(string, kwargs) {
  string = normalize(string, '')
  const options = {
    ...kwargs
  }

  try {
    const date = new Date(string)

    if (Number.isNaN(Date.parse(string))) {
      throw new Error('Invalid DateTime')
    }

    const comparisonDate = options.at ? new Date(options.at) : new Date()
    const ageMs = comparisonDate.valueOf() - date.valueOf()

    // Return age in weeks, if less than 6 months old
    const ageDays = ageMs / (1000 * 60 * 60 * 24)
    if (ageDays > 0 && ageDays < 183) {
      let ageWeeks = Math.floor(ageDays / 7)

      // If less than a week old, return 1 week
      ageWeeks = ageWeeks === 0 ? 1 : ageWeeks

      return plural(ageWeeks, 'week')
    }

    // Return age in months, if less than 2 years old
    const ageMonths =
      (comparisonDate.getFullYear() - date.getFullYear()) * 12 +
      (comparisonDate.getMonth() - date.getMonth()) -
      (comparisonDate.getDate() < date.getDate() ? 1 : 0)
    if (ageMonths < 24) {
      return `${ageMonths} months`
    }

    // Return age if over 2 years old
    const ageYears = Math.floor(ageMs / 3.15576e10)

    return `${ageYears} years`
  } catch (error) {
    return error.message
  }
}

/**
 * Returns number of days ago from the given date.
 * Today’s date will return 0.
 * Dates in the future return a negative number
 * Where times are given, the number of days is rounded down
 *
 * @example <caption>Today</caption>
 * daysAgo('2023-06-16') // 0
 * @example <caption>Yesterday</caption>
 * daysAgo('2023-06-15') // 1
 * @example <caption>Two week’s in future</caption>
 * daysAgo('2023-06-30') // -14
 * @param {string} string - Date
 * @returns {number} Number representing how many days ago it was
 */
function daysAgo(string) {
  const timeZone = 'Europe/London'
  string = normalize(string, '')

  try {
    const date = DateTime.fromISO(string, { zone: timeZone })
    const today = DateTime.now().setZone(timeZone)

    return Math.floor(today.diff(date, 'days').toObject().days)
  } catch (error) {
    return error.message.split(':')[0]
  }
}

/**
 * Return date a certain number of days from another date
 *
 * @example <caption>Days from today</caption>
 * duration('today', 5, 'days') // 2023-06-15T16:28:56.082+01:00
 * @example <caption>Days from date</caption>
 * duration('2023-05-11', 5, 'days') // 2023-05-16T00:00:00.000+01:00
 * @example <caption>Weeks from date</caption>
 * duration('2023-05-11', 5, 'weeks') // 2023-06-15T00:00:00.000+01:00
 * @example <caption>Months from date</caption>
 * duration('2023-05-11', 5, 'months') // 2023-10-11T00:00:00.000+01:00
 * @example <caption>Years from date</caption>
 * duration('2023-05-11', 5, 'years') // 2028-05-11T00:00:00.000+01:00
 * @param {string} string - Date
 * @param {number} number - Days to add
 * @param {string} [unit] - Type of unit to use
 * @returns {string} ISO 8601 date string
 */
function duration(string, number, unit) {
  const timeZone = 'Europe/London'
  string = normalize(string, '')

  try {
    if (string === 'today' || string === 'now') {
      string = DateTime.now().setZone(timeZone).toString()
    }

    // default unit to days
    if (unit === undefined) {
      unit = 'days'
    }

    const date = DateTime.fromISO(string, { zone: timeZone })
    const dur = Duration.fromObject({ [unit]: number })
    return date.plus(dur).toString()
  } catch (error) {
    return error.message.split(':')[0]
  }
}

/**
 * Convert ISO 8601 date string into a human readable date
 * with the GOV.UK style
 *
 * @see {@link https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#dates}
 * @example <caption>Full date</caption>
 * govukDate('2021-08-17') // 17 August 2021
 * @example <caption>Full date (including day of the week)</caption>
 * govukDate('2021-08-17', { showWeekday: true }) // Tuesday, 17 August 2021
 * @example <caption>Full date (truncated)</caption>
 * govukDate('2021-08-17', { truncate: true }) // 17 Aug 2021
 * govukDate('2021-08-17', 'truncate') // 17 Aug 2021
 * @example <caption>Month and year only</caption>
 * govukDate('2021-08') // August 2021
 * @example <caption>Month and year only (truncated)</caption>
 * govukDate('2021-08', { truncate: true }) // Aug 2021
 * govukDate('2021-08', 'truncate') // Aug 2021
 * @example <caption>Today’s date</caption>
 * govukDate('today') // 21 October 2021
 * govukDate('today', 'truncate') // 21 Oct 2021
 * @param {string} string - Date
 * @param {object} [kwargs] - Keyword arguments
 * @param {boolean} [kwargs.showWeekday] - Show day of the week
 * @param {boolean} [kwargs.truncate] - Truncate month name
 * @returns {string} `string` as a human readable date
 */
function govukDate(string, kwargs) {
  string = normalize(string, '')

  const options = {
    showWeekday: false,
    truncate: false,
    ...kwargs
  }

  /**
  /* Support providing 'truncate' keyword instead of keyword arguments
  /* @todo Deprecate keyword in next major release
   */
  if (typeof kwargs === 'string') {
    options.truncate = kwargs === 'truncate'
    console.warn(
      `Passing 'truncate' to govukDate is deprecated. Use the truncate option instead. See https://x-govuk.github.io/govuk-prototype-filters/date/#govukdate`
    )
  }

  try {
    let date
    let dateHasNoDay
    if (string === 'today' || string === 'now') {
      date = new Date()
    } else {
      const isoDateRegex = /^\d{4}-(?:[0]\d|1[0-2])$/
      dateHasNoDay = isoDateRegex.test(string)
      date = DateTime.fromISO(string).toJSDate()
    }

    // 2021-08 => August 2021
    // 2021-08 => Aug 2021 (truncated)
    // 2021-08-17 => 17 August 2021
    // 2021-08-17 => Tuesday, 17 August 2021 (include day of the week)
    // 2021-08-17 => 17 Aug 2021 (truncated)
    // 2021-08-17 => Tue, 17 Aug 2021 (include day of the week, truncated)
    let formattedDate = new Intl.DateTimeFormat('en-GB', {
      ...(options.showWeekday && {
        weekday: options.truncate ? 'short' : 'long'
      }),
      year: 'numeric',
      month: options.truncate ? 'short' : 'long',
      ...(!dateHasNoDay && { day: 'numeric' })
    }).format(date)

    // Node.js uses four-letter abbreviation for September only, weirdly
    formattedDate = formattedDate.replace(/Sept\s/, 'Sep ')
    return formattedDate
  } catch (error) {
    return error.message.split(':')[0]
  }
}

/**
 * Format ISO 8601 date string or time to a human readable time
 * with the GOV.UK style
 *
 * @see {@link https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#times}
 * @example <caption>Full date time</caption>
 * govukTime('2021-08-17T18:30:00') // 6:30pm
 * @example <caption>Full date time (which is midnight)</caption>
 * govukTime('2021-08-17T00:00:59') // midnight
 * @example <caption>Full date time (which is midday)</caption>
 * govukTime('2021-08-17T12:00:59') // midday
 * @example <caption>Time only</caption>
 * govukTime('18:30') // 6:30pm
 * @example <caption>The time now</caption>
 * govukTime('now') // 10:45am
 * @param {string} string - Time
 * @returns {string} `string` as a human readable time
 */
function govukTime(string) {
  string = normalize(string, '')

  try {
    if (string === 'now' || string === 'today') {
      string = DateTime.now().toString()
    }

    const date = DateTime.fromISO(string)

    // If o’clock, don’t show the minutes past the hour
    const hour = date.toFormat('h:mm').replace(':00', '')

    // Use a lowercase meridiem indicator
    const meridiem = date.toFormat('a').toLowerCase()

    // Show the hour followed by meridiem indicator (no space)
    let time = `${hour}${meridiem}`

    // If the time is 12am, show ‘midnight’ in brackets
    if (time === '12am') {
      time = '12am (midnight)'
    }

    // If the time is 12pm, show ‘midday’ in brackets
    if (time === '12pm') {
      time = '12pm (midday)'
    }

    return time
  } catch (error) {
    return error.message.split(':')[0]
  }
}

/**
 * Convert ISO 8601 date string into a human readable date and time
 * with the GOV.UK style
 *
 * @example <caption>Full date and time</caption>
 * govukDateTime('2021-08-17T18:30:00') // 17 August, 2021 at 6:30pm
 * @example <caption>Full date and time (with day of the week)</caption>
 * govukDateTime('2021-08-17', { showWeekday: true }) // Tuesday, 17 August 2021 at 6:30pm
 * @example <caption>Full date and time (time first)</caption>
 * govukDateTime('2021-08-17', { timeFirst: true }) // 6:30pm on 17 August 2021
 * govukDateTime('2021-08-17', 'on') // 6:30pm on 17 August 2021
 * @example <caption>Full date and time (truncated)</caption>
 * govukDateTime('2021-08-17', { truncated: true }) // 17 Aug 2021 at 6:30pm
 * @example <caption>Date only</caption>
 * govukDateTime('2021-08-17') // 17 August 2021
 * @example <caption>Time only</caption>
 * govukDateTime('18:30') // 6:30pm
 * @example <caption>The date and time now</caption>
 * govukDateTime('now') // 21 October 2021 at 10:45am
 * @param {string} string - Date
 * @param {object} [kwargs] - Keyword arguments
 * @param {boolean} [kwargs.showWeekday] - Show day of the week
 * @param {boolean} [kwargs.timeFirst] - Show time before date
 * @param {boolean} [kwargs.truncate] - Truncate month name
 * @returns {string} `string` as a human readable date
 */
function govukDateTime(string, kwargs) {
  string = normalize(string, '')

  if (string === 'today' || string === 'now') {
    string = DateTime.now().toString()
  }

  const options = {
    timeFirst: false,
    truncate: false,
    ...kwargs
  }

  /**
  /* Support providing 'on' keyword instead of keyword arguments
  /* @todo Deprecate keyword in next major release
   */
  if (typeof kwargs === 'string') {
    options.timeFirst = kwargs === 'on'
    options.truncate = kwargs === 'truncate'
    console.warn(
      `Passing 'on' to govukDateTime is deprecated. Use the timeFirst option instead. See https://x-govuk.github.io/govuk-prototype-filters/date/#govukdatetime`
    )
  }

  const components = string.split('T')
  if (components.length === 2) {
    // Return date and time
    const date = govukDate(components[0], options)
    const time = govukTime(components[1])

    return options.timeFirst ? `${time} on ${date}` : `${date} at ${time}`
  } else if (string.includes(':')) {
    // Return time only
    return govukTime(string)
  }

  // Return date only
  return govukDate(string)
}

const ALLOWED_VALUES_FOR_MONTHS = [
  ['1', '01', 'jan', 'january'],
  ['2', '02', 'feb', 'february'],
  ['3', '03', 'mar', 'march'],
  ['4', '04', 'apr', 'april'],
  ['5', '05', 'may'],
  ['6', '06', 'jun', 'june'],
  ['7', '07', 'jul', 'july'],
  ['8', '08', 'aug', 'august'],
  ['9', '09', 'sep', 'september'],
  ['10', 'oct', 'october'],
  ['11', 'nov', 'november'],
  ['12', 'dec', 'december']
]

/**
 * Normalise month input as words to it's number from 1 to 12
 *
 * @param {string} input - Month in words or as a number with or without a leading 0
 * @returns {string|undefined} Number of the month without a leading 0 or undefined
 */
function parseMonth(input) {
  if (input == null) return undefined
  const trimmedLowerCaseInput = input.trim().toLowerCase()
  return ALLOWED_VALUES_FOR_MONTHS.find((month) =>
    month.find((allowedValue) => allowedValue === trimmedLowerCaseInput)
  )?.[0]
}

/**
 * Convert `govukDateInput` values into an ISO 8601 date.
 *
 * The `govukDateInput` creates separate values for its component for `day`,
 * `month` and `year` values, optionally prefixed with a `namePrefix`.
 *
 * `namePrefix` is optional, and intended for the simplistic use case where
 * date values are saved at the top level of prototype session data.
 *
 * If no `namePrefix` is provided, assumes author is setting custom names for
 * each component value and storing session data in a nested object.
 *
 * @example <caption>With namePrefix</caption>
 * data = {
 *   'dob-day': '01',
 *   'dob-month': '02',
 *   'dob-year: '2012'
 * }
 * isoDateFromDateInput(data, 'dob') // 2012-02-01
 * @example <caption>Without namePrefix, month and year only</caption>
 * data = {
 *   issued: {
 *     month: '02',
 *     year: '2012'
 *   }
 * }
 * isoDateFromDateInput(data.issued) // 2012-02
 * @param {object} object - Object containing date values
 * @param {string} [namePrefix] - `namePrefix` used for date values
 * @returns {string} ISO 8601 date string
 */
function isoDateFromDateInput(object, namePrefix) {
  let day, month, year

  if (namePrefix) {
    day = Number(object[`${namePrefix}-day`])
    month = Number(parseMonth(object[`${namePrefix}-month`]))
    year = Number(object[`${namePrefix}-year`])
  } else {
    day = Number(object?.day)
    month = Number(parseMonth(object?.month))
    year = Number(object?.year)
  }

  try {
    if (!day) {
      return DateTime.local(year, month).toFormat('yyyy-LL')
    }

    return DateTime.local(year, month, day).toISODate()
  } catch (error) {
    return error.message.split(':')[0]
  }
}

/**
 * Convert number into the name of corresponding month
 *
 * @see {@link https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#dates}
 * @example month(3) // March
 * @example month(3, { truncate: true }) // Mar
 * @example month(3, 'truncate') // Mar
 * @param {number|string} number - Value to convert
 * @param {object} [kwargs] - Keyword arguments
 * @param {boolean} [kwargs.truncate] - Truncate month name
 * @returns {string} Month name
 */
function monthName(number, kwargs) {
  const monthIndex = Number(number) - 1
  const date = new Date(2012, monthIndex)

  const options = {
    truncate: false,
    ...kwargs
  }

  /**
  /* Support providing 'on' keyword instead of keyword arguments
  /* @todo Deprecate keyword in next major release
   */
  if (typeof kwargs === 'string') {
    options.truncate = kwargs === 'truncate'
    console.warn(
      `Passing 'truncate' to monthName is deprecated. Use the truncate option instead. See https://x-govuk.github.io/govuk-prototype-filters/date/#monthname`
    )
  }

  let formattedMonth = new Intl.DateTimeFormat('en-GB', {
    month: options.truncate ? 'short' : 'long'
  }).format(date)

  // Node.js uses four-letter abbreviation for September only, weirdly
  formattedMonth = formattedMonth.replace('Sept', 'Sep')
  return formattedMonth
}

module.exports = {
  age,
  daysAgo,
  duration,
  govukDate,
  govukDateTime,
  govukTime,
  isoDateFromDateInput,
  monthName
}

// Add date filters to GOV.UK Prototype Kit
views.addFilter('age', age)
views.addFilter('daysAgo', daysAgo)
views.addFilter('duration', duration)
views.addFilter('govukDate', govukDate)
views.addFilter('govukDateTime', govukDateTime)
views.addFilter('govukTime', govukTime)
views.addFilter('isoDateFromDateInput', isoDateFromDateInput)
views.addFilter('monthName', monthName)
