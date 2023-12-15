const { views } = require('govuk-prototype-kit')
const { DateTime, Duration, Settings } = require('luxon')
const { normalize } = require('./utils.js')

Settings.throwOnInvalid = true

/**
 * Returns number of days ago from the given date.
 * Today’s date will return 0.
 * Dates in the future return a negative number
 * Where times are given, the number of days is rounded down.
 * @example <caption>Yesterday</caption>
 * daysAgo('2023-06-15', 1) //
 * @example <caption>Today</caption>
 * daysAgo('2023-06-16', 0) //
 * @example <caption>Two week’s in future</caption>
 * daysAgo('2023-06-30', -14) //
 * @param {string} string - Date
 * @returns {number} number representing how many days ago it was
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
 * Return date a certain number of days from another date.
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
 * @param {number} number of days to add
 * @param {string} [unit] the type of units to use
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
 * with the GOV.UK style.
 * @see {@link https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#dates}
 * @example <caption>Full date</caption>
 * govukDate('2021-08-17') // 17 August 2021
 * @example <caption>Full date (truncated)</caption>
 * govukDate('2021-08-17', 'truncate') // 17 Aug 2021
 * @example <caption>Month and year only</caption>
 * govukDate('2021-08') // August 2021
 * @example <caption>Month and year only (truncated)</caption>
 * govukDate('2021-08', 'truncate') // Aug 2021
 * @example <caption>Today’s date</caption>
 * govukDate('today') // 21 October 2021
 * govukDate('today', 'truncate') // 21 Oct 2021
 * @param {string} string - Date
 * @param {boolean|string} [format] - Date format (currently accepts ‘truncate’)
 * @returns {string} `string` as a human readable date
 */
function govukDate(string, format = false) {
  string = normalize(string, '')

  try {
    if (string === 'today' || string === 'now') {
      string = DateTime.now().toString()
    }

    const isoDateRegex = /^\d{4}-(?:[0]\d|1[0-2])$/
    const dateHasNoDay = isoDateRegex.test(string)
    const truncateDate = format === 'truncate'
    const date = DateTime.fromISO(string)

    // 2021-08 => August 2021
    // 2021-08 => Aug 2021 (truncated)
    if (dateHasNoDay) {
      const tokens = truncateDate ? 'MMM yyyy' : 'MMMM yyyy'
      return date.toFormat(tokens)
    }

    // 2021-08-17 => 17 August 2021
    // 2021-08-17 => 17 Aug 2021 (truncated)
    const preset = truncateDate ? 'DATE_MED' : 'DATE_FULL'
    return date.setLocale('en-GB').toLocaleString(DateTime[preset])
  } catch (error) {
    return error.message.split(':')[0]
  }
}

/**
 * Format ISO 8601 date string or time to a human readable time
 * with the GOV.UK style.
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
 * with the GOV.UK style.
 * @example <caption>Full date and time</caption>
 * govukDateTime('2021-08-17T18:30:00') // 17 August 2021 at 6:30pm
 * @example <caption>Full time and date</caption>
 * govukDateTime('2021-08-17', 'on') // 6:30pm on 17 August 2021
 * @example <caption>Date only</caption>
 * govukDateTime('2021-08-17') // 17 August 2021
 * @example <caption>Time only</caption>
 * govukDateTime('18:30') // 6:30pm
 * @example <caption>The date and time now</caption>
 * govukDateTime('now') // 21 October 2021 at 10:45am
 * @param {string} string - Date
 * @param {boolean|string} [format] - Date format (currently accepts ‘on’)
 * @returns {string} `string` as a human readable date
 */
function govukDateTime(string, format = false) {
  string = normalize(string, '')

  const components = string.split('T')

  if (components.length === 2) {
    const date = govukDate(components[0], format)
    const time = govukTime(components[1])

    return format === 'on' ? `${time} on ${date}` : `${date} at ${time}`
  } else if (string.includes(':')) {
    return govukTime(string)
  } else {
    return govukDate(components[0])
  }
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
    month = Number(object[`${namePrefix}-month`])
    year = Number(object[`${namePrefix}-year`])
  } else {
    day = Number(object?.day)
    month = Number(object?.month)
    year = Number(object?.year)
  }

  try {
    if (!day) {
      return DateTime.local(year, month).toFormat('yyyy-LL')
    } else {
      return DateTime.local(year, month, day).toISODate()
    }
  } catch (error) {
    return error.message.split(':')[0]
  }
}

/**
 * Convert number into the name of corresponding month.
 * @see {@link https://www.gov.uk/guidance/style-guide/a-to-z-of-gov-uk-style#dates}
 * @example month(3) // March
 * @example month(3, 'truncate') // Mar
 * @param {number|string} number - Value to convert
 * @param {boolean|string} [format] - Truncate name
 * @returns {string} Month name
 */
function monthName(number, format = false) {
  const monthIndex = Number(number) - 1
  const date = new Date(2012, monthIndex)
  const truncate = format === 'truncate'

  return new Intl.DateTimeFormat('en-GB', {
    month: truncate ? 'short' : 'long'
  }).format(date)
}

module.exports = {
  daysAgo,
  duration,
  govukDate,
  govukDateTime,
  govukTime,
  isoDateFromDateInput,
  monthName
}

// Add date filters to GOV.UK Prototype Kit
views.addFilter('daysAgo', daysAgo)
views.addFilter('duration', duration)
views.addFilter('govukDate', govukDate)
views.addFilter('govukDateTime', govukDateTime)
views.addFilter('govukTime', govukTime)
views.addFilter('isoDateFromDateInput', isoDateFromDateInput)
views.addFilter('monthName', monthName)
