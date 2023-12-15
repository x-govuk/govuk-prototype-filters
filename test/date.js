const assert = require('node:assert/strict')
const { describe, it } = require('node:test')
const {
  daysAgo,
  duration,
  govukDate,
  govukTime,
  isoDateFromDateInput,
  monthName
} = require('../lib/date.js')

describe('Date filters', async () => {
  const now = Date.now()

  it('Returns correct number of days ago', () => {
    const dateNow = new Date()
    const yesterday = new Date(dateNow)
    yesterday.setDate(yesterday.getDate() - 1)
    const tomorrow = new Date(dateNow)
    tomorrow.setDate(tomorrow.getDate() + 1)

    assert.equal(daysAgo(dateNow.toISOString()), 0)
    assert.equal(daysAgo(yesterday.toISOString()), 1)
    assert.equal(daysAgo(tomorrow.toISOString()), -1)
  })

  it('Returns error if date can’t be parsed', () => {
    assert.equal(daysAgo('2021-23-45'), 'Invalid DateTime')
  })

  it('Returns date a certain number of days from another date', () => {
    const dt = new Date()
    dt.setDate(dt.getDate() + 5)

    assert.equal(
      duration('today', 5).substring(0, 10),
      dt.toISOString().substring(0, 10)
    )
    assert.equal(duration('2023-05-11', 5), '2023-05-16T00:00:00.000+01:00')
    assert.equal(
      duration('2023-05-11', 5, 'days'),
      '2023-05-16T00:00:00.000+01:00'
    )
    assert.equal(
      duration('2023-05-11', 5, 'weeks'),
      '2023-06-15T00:00:00.000+01:00'
    )
    assert.equal(
      duration('2023-05-11', 5, 'months'),
      '2023-10-11T00:00:00.000+01:00'
    )
    assert.equal(
      duration('2023-05-11', 5, 'years'),
      '2028-05-11T00:00:00.000+01:00'
    )
  })

  it('Returns error trying to return a date from another date', () => {
    assert.equal(duration('2021-23-45', 5), 'Invalid DateTime')
  })

  it('Converts ISO 8601 date time to a date using the GOV.UK style', () => {
    assert.equal(govukDate('2021-08-17'), '17 August 2021')
    assert.equal(govukDate('2021-08-17', 'truncate'), '17 Aug 2021')
    assert.equal(govukDate('2021-08'), 'August 2021')
    assert.equal(govukDate('2021-08', 'truncate'), 'Aug 2021')

    const govukDateToday = Date.parse(govukDate('today'))
    assert.equal(String(govukDateToday).slice(0, 4), String(now).slice(0, 4))

    const govukDateTodayTruncated = Date.parse(govukDate('today', 'truncate'))
    assert.equal(
      String(govukDateTodayTruncated).slice(0, 4),
      String(now).slice(0, 4)
    )
  })

  it('Returns error converting ISO 8601 date to date with GOV.UK style', () => {
    assert.equal(govukDate('2021-23-45'), 'Invalid DateTime')
  })

  it('Converts ISO 8601 date time to a time with the GOV.UK style', () => {
    assert.equal(govukTime('2021-08-17T18:30:00'), '6:30pm')
    assert.equal(govukTime('2021-08-17T00:00:59'), '12am (midnight)')
    assert.equal(govukTime('2021-08-17T12:00:59'), '12pm (midday)')
    assert.equal(govukTime('18:30'), '6:30pm')
    assert.ok(govukTime('now'))
  })

  it('Returns error converting an ISO 8601 date time to a time using the GOV.UK style', () => {
    assert.equal(govukTime('2021-08-17T25:61:00'), 'Invalid DateTime')
  })

  it('Converts `govukDateInput` values to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '01',
        month: '02',
        year: '2012'
      }),
      '2012-02-01'
    )
  })

  it('Converts `govukDateInput` with `namePrefix` to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput(
        {
          'example-day': '01',
          'example-month': '02',
          'example-year': '2012'
        },
        'example'
      ),
      '2012-02-01'
    )
  })

  it('Returns error converting `govukDateInput` to an ISO 8601 date', () => {
    assert.equal(isoDateFromDateInput({ foo: 'bar' }), 'Invalid DateTime')
  })

  it('Converts number into name of corresponding month.', () => {
    assert.equal(monthName(3), 'March')
    assert.equal(monthName('3'), 'March')
    assert.equal(monthName(3, 'truncate'), 'Mar')
    assert.equal(monthName('3', 'truncate'), 'Mar')
  })
})
