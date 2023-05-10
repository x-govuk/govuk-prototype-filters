import test from 'ava'
import {
  dateFromNow,
  govukDate,
  govukTime,
  isoDateFromDateInput
} from '../lib/date.js'

const now = Date.now()

test('Adds 5 days to todays date', t => {
  const dt = new Date()
  dt.setDate(dt.getDate() + 5)
  t.is((dateFromNow(5)).substring(0, 10), dt.toISOString().substring(0, 10))
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
