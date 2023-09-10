import {
  FindOneAndDeleteOptions,
  FindOneAndUpdateOptions,
  MongoOptions,
} from 'mongodb'
import {Type, Optional, Required} from '../entity/type.js'
import {Repository, TQuery} from './repository.js'

type RCategory = Type<Required>
type OCategory = Type<Optional>

export default class TypeRepository extends Repository<OCategory, RCategory> {
  protected readonly DB: string = 'hoarder'
  protected readonly COLLECTION: string = 'hoarder'
  constructor(opts: {url: string; conf?: MongoOptions}) {
    super(opts)
  }

  async find(
    query: TQuery<{find: Type<Optional>}>
  ): Promise<RCategory[] | null> {
    return await super.find(query)
  }

  async add(query: TQuery<{fields: Type<Required>}>): Promise<void> {
    return await super.add(query)
  }

  async update(
    query: TQuery<
      {
        fields: Type<Optional>
        find: Type<Optional>
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
      {find: Type<Optional>; options: FindOneAndDeleteOptions},
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
