import {describe, it} from 'node:test'
import AdRepository from '../../../src/repository/adRepository.js'
import assert from 'node:assert'
import {Ad, Required} from '../../../src/entity/ad.js'
import {MongoOptions, ObjectId} from 'mongodb'

describe('AdRepository Positive', () => {
  const [dbUser, dbPassword] = ['user', 'example']
  const opts: {url: string; conf?: MongoOptions} = {
    url: `mongodb://${dbUser}:${dbPassword}@localhost:27017/`,
  }
  const repo = new AdRepository(opts)
  const ad: Ad<Required> = {
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

  it('.add', async () => {
    try {
      await repo.add({fields: ad})
      assert.ok('_id' in ad)
    } catch (e) {
      assert.ifError(e)
    }
  })

  it('.find by id', async () => {
    const actual = await repo.find({
      find: {
        _id: ad._id,
      },
    })
    assert.notStrictEqual(actual, null)
    assert.deepEqual((actual as unknown as Ad<Required>[])[0], ad)
  })

  it('.find many params', async () => {
    const actual = await repo.find({
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
        date: ad.date,
      },
    })
    assert.notStrictEqual(actual, null)
    assert.deepEqual(actual![0], ad)
  })

  it('.find null', async () => {
    const actual = await repo.find({
      find: {
        title: 'iPhone 13 Pro Max',
      },
    })
    assert.strictEqual(actual, null)
  })

  it('.update', async () => {
    const actual = await repo.update({
      find: {
        _id: new ObjectId(ad._id),
      },
      fields: {
        satus: 'active',
      },
      options: {
        includeResultMetadata: true,
      },
    })
    assert.strictEqual(actual, true)
    const newAd = await repo.find({find: {_id: ad._id}})
    assert.notStrictEqual(newAd, null)
    assert.strictEqual((newAd as unknown as Ad<Required>[])[0].satus, 'active')
  })

  // it('.delete', () => {
  //   const actual = repo.dalete({
  //     find: {
  //       id: ad.id,
  //     },
  //   })
  //   assert.strictEqual(actual, true)
  //   const notFound = repo.find({find: {id: ad.id}})
  //   assert.strictEqual(notFound, null)
  // })
})
