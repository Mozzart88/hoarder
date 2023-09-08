import {describe, it} from 'node:test'
import AdRepository from '../../../src/repository/adRepository.js'
import assert from 'node:assert'
import Ad from '../../../src/entity/ad.js'

describe('AdRepository Positive', () => {
  const opts = {
    url: 'some url',
  }
  const repo = new AdRepository(opts)
  const ad: Ad = {
    title: 'iPhone 15 Pro Max',
    description: 'Hello!!!',
    date: new Date().getTime(),
    category: {
      id: 1,
      name: 'Electronics',
    },
    subCategory: {
      id: 1,
      name: 'cell phone',
    },
    type: {
      id: 1,
      name: '??',
    },
    subType: {
      id: 1,
      name: '!!',
    },
    price: 99.99,
    satus: 'new',
    tags: [{name: '#iPhone', id: 1}],
    user: {
      id: 'asdf',
      name: 'tom',
    },
  }
  it('.add', () => {
    try {
      const actual = repo.add({fields: ad})
      ad.id = actual.id
      assert.deepEqual(actual, ad)
    } catch (e) {
      assert.ifError(e)
    }
  })
  it('.find', () => {
    const actual = repo.find({
      find: {
        title: 'iPhone 15 Pro Max',
        subCategory: {
          id: 1,
          name: 'cell phone',
        },
        subType: {
          id: 1,
          name: '!!',
        },
        price: 99.99,
        satus: 'new',
        tags: [{name: '#iPhone', id: 1}],
      },
    })
    assert.deepEqual(actual, ad)
  })
  it('.update', () => {
    const actual = repo.update({
      find: {
        id: 'some',
      },
      fields: {
        satus: 'active',
      },
    })
    assert.strictEqual(actual, true)
    const newAd = repo.find({find: {id: ad.id}})
    assert.notStrictEqual(newAd, null)
    assert.strictEqual(newAd!.satus, 'active')
  })
  it('.delete', () => {
    const actual = repo.dalete({
      find: {
        id: ad.id,
      },
    })
    assert.strictEqual(actual, true)
    const notFound = repo.find({find: {id: ad.id}})
    assert.strictEqual(notFound, null)
  })
})
