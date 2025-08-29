const assert = require('node:assert/strict')
const { describe, it } = require('node:test')

const { get, normalize } = require('../lib/utils.js')

describe('get', () => {
  const testObject = {
    user: {
      profile: {
        name: 'John Doe',
        age: 30,
        settings: {
          theme: 'dark',
          notifications: true
        }
      },
      tags: ['admin', 'user', 'developer'],
      active: true
    },
    count: 0,
    nullValue: null,
    emptyString: '',
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]
  }

  describe('With dot notation path', () => {
    it('Gets nested property with dot notation', () => {
      assert.strictEqual(get(testObject, 'user.profile.name'), 'John Doe')
      assert.strictEqual(get(testObject, 'user.profile.age'), 30)
      assert.strictEqual(get(testObject, 'user.active'), true)
    })

    it('Gets deeply nested property', () => {
      assert.strictEqual(get(testObject, 'user.profile.settings.theme'), 'dark')
      assert.strictEqual(
        get(testObject, 'user.profile.settings.notifications'),
        true
      )
    })

    it('Handle falsy but valid values', () => {
      assert.strictEqual(get(testObject, 'count'), 0)
      assert.strictEqual(get(testObject, 'emptyString'), '')
      assert.strictEqual(get(testObject, 'nullValue'), null)
    })
  })

  describe('With array notation path', () => {
    it('Gets array elements with bracket notation', () => {
      assert.strictEqual(get(testObject, 'user.tags[0]'), 'admin')
      assert.strictEqual(get(testObject, 'user.tags[1]'), 'user')
      assert.strictEqual(get(testObject, 'user.tags[2]'), 'developer')
    })

    it('Gets nested object properties in arrays', () => {
      assert.strictEqual(get(testObject, 'items[0].id'), 1)
      assert.strictEqual(get(testObject, 'items[0].name'), 'Item 1')
      assert.strictEqual(get(testObject, 'items[1].name'), 'Item 2')
    })
  })

  describe('With array paths', () => {
    it('Works with array of keys', () => {
      assert.strictEqual(
        get(testObject, ['user', 'profile', 'name']),
        'John Doe'
      )
      assert.strictEqual(get(testObject, ['user', 'tags', '0']), 'admin')
      assert.strictEqual(get(testObject, ['items', '0', 'id']), 1)
    })
  })

  describe('With default values', () => {
    it('Returns default value when path does not exist', () => {
      assert.strictEqual(
        get(testObject, 'user.profile.nonExistent', 'default'),
        'default'
      )
      assert.strictEqual(get(testObject, 'user.nonExistent.path', 42), 42)
      assert.strictEqual(get(testObject, 'completely.missing', null), null)
    })

    it('Returns actual value even if default is provided', () => {
      assert.strictEqual(
        get(testObject, 'user.profile.name', 'default'),
        'John Doe'
      )
      assert.strictEqual(get(testObject, 'count', 'default'), 0)
      assert.strictEqual(get(testObject, 'nullValue', 'default'), null)
    })

    it('Returns default value when resolved value is undefined', () => {
      assert.strictEqual(
        get(testObject, 'user.undefinedProp', 'fallback'),
        'fallback'
      )
    })
  })

  describe('With edge cases', () => {
    it('Returns undefined for falsy paths', () => {
      assert.strictEqual(get(testObject, ''), undefined)
      assert.strictEqual(get(testObject, null), undefined)
      assert.strictEqual(get(testObject, undefined), undefined)
    })

    it('Handles null/undefined objects gracefully', () => {
      assert.strictEqual(get(null, 'any.path'), null)
      assert.strictEqual(get(undefined, 'any.path'), undefined)
      assert.strictEqual(get(null, 'any.path', 'default'), null)
    })

    it('Returns undefined for non-existent paths', () => {
      assert.strictEqual(get(testObject, 'user.profile.nonExistent'), undefined)
      assert.strictEqual(get(testObject, 'user.tags[10]'), undefined)
      assert.strictEqual(get(testObject, 'nonExistent.nonExistent'), undefined)
    })

    it('Handles empty object', () => {
      assert.strictEqual(get({}, 'any.path'), undefined)
      assert.strictEqual(get({}, 'any.path', 'default'), 'default')
    })

    it('Handles array out of bounds', () => {
      assert.strictEqual(get(testObject, 'user.tags[99]'), undefined)
      assert.strictEqual(get(testObject, 'user.tags[-1]'), undefined)
    })
  })

  describe('complex paths', () => {
    it('Handles mixed notation', () => {
      // Note: This depends on your regex implementation
      assert.strictEqual(get(testObject, 'items[0].name'), 'Item 1')
      assert.strictEqual(get(testObject, 'user.tags[1]'), 'user')
    })
  })
})

describe('normalize', async () => {
  it('Normalises value provided to a filter', () => {
    assert.equal(normalize('Dollars', 'Pounds'), 'Dollars')
    assert.equal(normalize(undefined, 'Pounds'), 'Pounds')
  })
})
