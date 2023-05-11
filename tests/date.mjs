import test from 'ava'
import {
  duration,
  govukDate,
  govukTime,
  isoDateFromDateInput
} from '../lib/date.js'

const now = Date.now()

test('Return a date a certain number of days from another date', t => {
  const dt = new Date()
  dt.setDate(dt.getDate() + 5)
  t.is((duration('today', 5)).substring(0, 10), dt.toISOString().substring(0, 10))
  t.is((duration('2023-05-11', 5)), '2023-05-16T00:00:00.000+01:00')
  t.is((duration('2023-05-11', 5, 'days')), '2023-05-16T00:00:00.000+01:00')
  t.is((duration('2023-05-11', 5, 'weeks')), '2023-06-15T00:00:00.000+01:00')
  t.is((duration('2023-05-11', 5, 'months')), '2023-10-11T00:00:00.000+01:00')
  t.is((duration('2023-05-11', 5, 'years')), '2028-05-11T00:00:00.000+01:00')
})

test('Returns error trying to return a date from another date', t => {
  t.is(duration('2021-23-45', 5), 'Invalid DateTime')
})

test('Converts an ISO 8601 date time to a date using the GOV.UK style', t => {
  t.is(govukDate('2021-08-17'), '17 August 2021')
  t.is(govukDate('2021-08-17', 'truncate'), '17 Aug 2021')
  t.is(govukDate('2021-08'), 'August 2021')
  t.is(govukDate('2021-08', 'truncate'), 'Aug 2021')

  const govukDateToday = Date.parse(govukDate('today'))
  t.is(String(govukDateToday).slice(0, 4), String(now).slice(0, 4))

  const govukDateTodayTruncated = Date.parse(govukDate('today', 'truncate'))
  t.is(String(govukDateTodayTruncated).slice(0, 4), String(now).slice(0, 4))
})

test('Returns error converting an ISO 8601 date time to a date using the GOV.UK style', t => {
  t.is(govukDate('2021-23-45'), 'Invalid DateTime')
})

test('Converts an ISO 8601 date time to a time using the GOV.UK style', t => {
  t.is(govukTime('2021-08-17T18:30:00'), '6:30pm')
  t.is(govukTime('2021-08-17T00:00:59'), 'midnight')
  t.is(govukTime('2021-08-17T12:00:59'), 'midday')
  t.is(govukTime('18:30'), '6:30pm')
  t.truthy(govukTime('now'))
})

test('Returns error converting an ISO 8601 date time to a time using the GOV.UK style', t => {
  t.is(govukTime('2021-08-17T25:61:00'), 'Invalid DateTime')
})

test('Converts `govukDateInput` values to ISO 8601 date', t => {
  t.is(isoDateFromDateInput({
    day: '01',
    month: '02',
    year: '2012'
  }), '2012-02-01')
})

test('Converts `govukDateInput` values with `namePrefix` to ISO 8601 date', t => {
  t.is(isoDateFromDateInput({
    'example-day': '01',
    'example-month': '02',
    'example-year': '2012'
  }, 'example'), '2012-02-01')
})

test('Returns error converting `govukDateInput` values to an ISO 8601 date', t => {
  t.is(isoDateFromDateInput({ foo: 'bar' }), 'Invalid DateTime')
})
