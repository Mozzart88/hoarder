import {
  FindOneAndDeleteOptions,
  FindOneAndUpdateOptions,
  MongoOptions,
} from 'mongodb'
import {Category, Optional, Required} from '../entity/category.js'
import {Repository, TQuery} from './repository.js'

type RCategory = Category<Required>
type OCategory = Category<Optional>

export default class CategoryRepository extends Repository<
  OCategory,
  RCategory
> {
  protected readonly DB: string = 'hoarder'
  protected readonly COLLECTION: string = 'hoarder'
  constructor(opts: {url: string; conf?: MongoOptions}) {
    super(opts)
  }

  async find(
    query: TQuery<{find: Category<Optional>}>
  ): Promise<RCategory[] | null> {
    return await super.find(query)
  }

  async add(query: TQuery<{fields: Category<Required>}>): Promise<void> {
    return await super.add(query)
  }

  async update(
    query: TQuery<
      {
        fields: Category<Optional>
        find: Category<Optional>
        options: FindOneAndUpdateOptions
      },
      FindOneAndUpdateOptions & {
        includeResultMetadata: true
      }
    >
  ): Promise<boolean> {
    const {fields, find, options} = query
    try {
      const collection = await this.connect()
      await collection.findOneAndUpdate(find, {$set: fields}, options)
      return true
    } finally {
      await this.close()
    }
  }

  async dalete(
    query: TQuery<
      {find: Category<Optional>; options: FindOneAndDeleteOptions},
      FindOneAndUpdateOptions & {
        includeResultMetadata: true
      }
    >
  ): Promise<boolean> {
    const {find, options} = query
    try {
      const collection = await this.connect()
      await collection.findOneAndDelete(find, options)
      return true
    } finally {
      await this.close()
    }
  }
}
