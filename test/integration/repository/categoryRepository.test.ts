import {describe, it} from 'node:test'
import CategoryRepository from '../../../src/repository/categoryRepository.js'
import assert from 'node:assert'
import {Category, Required} from '../../../src/entity/category.js'
import {MongoOptions, ObjectId} from 'mongodb'

describe('CategoryRepository Positive', () => {
  const [dbUser, dbPassword] = ['user', 'example']
  const opts: {url: string; conf?: MongoOptions} = {
    url: `mongodb://${dbUser}:${dbPassword}@localhost:27017/`,
  }
  const repo = new CategoryRepository(opts)
  const category: Category<Required> = {
    name: 'electronics',
    sub: ['cellphone', 'TV', 'kitchen'],
  }

  it('.add', async () => {
    try {
      await repo.add({fields: category})
      assert.ok('_id' in category)
    } catch (e) {
      assert.ifError(e)
    }
  })

  it('.find by id', async () => {
    const actual = await repo.find({
      find: {
        _id: category._id,
      },
    })
    assert.notStrictEqual(actual, null)
    assert.deepEqual((actual as unknown as Category<Required>[])[0], category)
  })

  it('.find many params', async () => {
    const actual = await repo.find({
      find: {
        _id: new ObjectId(category._id),
      },
    })
    assert.notStrictEqual(actual, null)
    assert.deepEqual(actual![0], category)
  })

  it('.find null', async () => {
    const actual = await repo.find({
      find: {
        name: 'a',
      },
    })
    assert.strictEqual(actual, null)
  })

  it('.update', async () => {
    const actual = await repo.update({
      find: {
        _id: new ObjectId(category._id),
      },
      fields: {
        name: 'transport',
      },
      options: {
        includeResultMetadata: true,
      },
    })
    assert.strictEqual(actual, true)
    const newAd = await repo.find({find: {_id: category._id}})
    assert.notStrictEqual(newAd, null)
    assert.strictEqual(
      (newAd as unknown as Category<Required>[])[0].name,
      'transport'
    )
  })

  it('.delete', async () => {
    const actual = await repo.dalete({
      find: {
        _id: new ObjectId(category._id),
      },
      options: {
        includeResultMetadata: true,
      },
    })
    assert.strictEqual(actual, true)
    const notFound = await repo.find({find: {_id: category._id}})
    assert.strictEqual(notFound, null)
  })
})
