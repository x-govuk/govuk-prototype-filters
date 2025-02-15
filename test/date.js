const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const {
  daysAgo,
  duration,
  govukDate,
  govukTime,
  govukDateTime,
  isoDateFromDateInput,
  monthName
} = require('../lib/date.js')

describe('daysAgo', async () => {
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
})

describe('duration', async () => {
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
})

describe('Date filters', async () => {
  it('Converts ISO 8601 date time to a date using the GOV.UK style', () => {
    assert.equal(govukDate('2021-08-17'), '17 August 2021')
    assert.equal(govukDate('2021-08-17', 'truncate'), '17 Aug 2021')
    assert.equal(govukDate('2021-08'), 'August 2021')
    assert.equal(govukDate('2021-08', 'truncate'), 'Aug 2021')
  })

  it('Converts keyword to a date using the GOV.UK style', (context) => {
    // Mock now as 29 January 2025 at 5:30pm
    context.mock.timers.enable({ apis: ['Date'], now: 1738171800000 })

    assert.equal(govukDate('today'), '29 January 2025')
    assert.equal(govukDate('now'), '29 January 2025')
  })

  it('Truncates September to 3 letters', () => {
    assert.equal(govukDate('2024-09-21', 'truncate'), '21 Sep 2024')
    assert.equal(govukDate('2024-09', 'truncate'), 'Sep 2024')
  })

  it('Returns error converting ISO 8601 date to date with GOV.UK style', () => {
    assert.equal(govukDate('2021-23-45'), 'Invalid DateTime')
  })
})

describe('govukTime', async () => {
  it('Converts ISO 8601 date time to a time with the GOV.UK style', () => {
    assert.equal(govukTime('2021-08-17T18:30:00'), '6:30pm')
    assert.equal(govukTime('2021-08-17T00:00:59'), '12am (midnight)')
    assert.equal(govukTime('2021-08-17T12:00:59'), '12pm (midday)')
    assert.equal(govukTime('18:30'), '6:30pm')
  })

  it('Converts keyword to a time with the GOV.UK style', (context) => {
    // Mock now as 29 January 2025 at 5:30pm
    context.mock.timers.enable({ apis: ['Date'], now: 1738171800000 })

    assert.equal(govukTime('now'), '5:30pm')
    assert.equal(govukTime('today'), '5:30pm')
  })

  it('Returns error converting an ISO 8601 date time to a time using the GOV.UK style', () => {
    assert.equal(govukTime('2021-08-17T25:61:00'), 'Invalid DateTime')
  })
})

describe('govukDateTime', async () => {
  it('Converts ISO 8601 date time to date time with the GOV.UK style', () => {
    assert.equal(
      govukDateTime('2021-08-17T18:30:00'),
      '17 August 2021 at 6:30pm'
    )
    assert.equal(
      govukDateTime('2021-08-17T18:30:00', 'on'),
      '6:30pm on 17 August 2021'
    )
    assert.equal(
      govukDateTime('2021-08-17T00:00:59'),
      '17 August 2021 at 12am (midnight)'
    )
    assert.equal(
      govukDateTime('2021-08-17T12:00:59'),
      '17 August 2021 at 12pm (midday)'
    )
    assert.equal(govukDateTime('2021-08-17'), '17 August 2021')
    assert.equal(govukDateTime('18:30'), '6:30pm')
  })

  it('Converts keyword to date time with the GOV.UK style', (context) => {
    // Mock now as 29 January 2025 at 5:30pm
    context.mock.timers.enable({ apis: ['Date'], now: 1738171800000 })

    assert.equal(govukDateTime('now'), '29 January 2025 at 5:30pm')
    assert.equal(govukDateTime('now', 'on'), '5:30pm on 29 January 2025')
    assert.equal(govukDateTime('today'), '29 January 2025 at 5:30pm')
    assert.equal(govukDateTime('today', 'on'), '5:30pm on 29 January 2025')
  })

  it('Returns error converting an ISO 8601 date time to date time using the GOV.UK style', () => {
    assert.equal(
      govukDateTime('2021-08-17T25:61:00'),
      '17 August 2021 at Invalid DateTime'
    )
  })
})

describe('isoDateFromDateInput', async () => {
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

  it('Converts `govukDateInput` values with a full-length word for the month to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '01',
        month: 'october',
        year: '2012'
      }),
      '2012-10-01'
    )
  })

  it('Converts `govukDateInput` values with a full-length uppercased word for the month to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '01',
        month: 'OCTOBER',
        year: '2012'
      }),
      '2012-10-01'
    )
  })

  it('Converts `govukDateInput` values with an abbreviated word for the month to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '01',
        month: 'oct',
        year: '2012'
      }),
      '2012-10-01'
    )
  })

  it('Converts `govukDateInput` values with an abbreviated uppercase word for the month to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '01',
        month: 'OCT',
        year: '2012'
      }),
      '2012-10-01'
    )
  })

  it('Converts `govukDateInput` values with leading and trailing spaces to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput({
        day: ' 01 ',
        month: ' 10 ',
        year: ' 2012 '
      }),
      '2012-10-01'
    )
  })

  it('Converts `govukDateInput` values with single digit months and days to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '1',
        month: '4',
        year: '2012'
      }),
      '2012-04-01'
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

  it('Converts `govukDateInput` with `namePrefix` and abbreviated word for the month to ISO 8601 date', () => {
    assert.equal(
      isoDateFromDateInput(
        {
          'example-day': '01',
          'example-month': 'feb',
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

  it('Returns error converting `govukDateInput` values where month contains a word that starts with a valid abbreviation for the month', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '01',
        month: 'octopus',
        year: '2012'
      }),
      'Invalid DateTime'
    )
  })

  it('Returns error converting `govukDateInput` values where only month is empty', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '01',
        month: '',
        year: '2012'
      }),
      'Invalid DateTime'
    )
  })

  it('Returns error converting `govukDateInput` values where only month is undefined', () => {
    assert.equal(
      isoDateFromDateInput({
        day: '01',
        year: '2012'
      }),
      'Invalid DateTime'
    )
  })
})

describe('monthName', async () => {
  it('Converts number into name of corresponding month.', () => {
    assert.equal(monthName(3), 'March')
    assert.equal(monthName('3'), 'March')
    assert.equal(monthName(3, 'truncate'), 'Mar')
    assert.equal(monthName('3', 'truncate'), 'Mar')
  })

  it('Truncates September to 3 letters', () => {
    assert.equal(monthName(9, 'truncate'), 'Sep')
    assert.equal(monthName('9', 'truncate'), 'Sep')
  })
})
