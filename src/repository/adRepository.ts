import {
  FindOneAndDeleteOptions,
  FindOneAndUpdateOptions,
  MongoOptions,
} from 'mongodb'
import {Ad, Optional, Required} from '../entity/ad.js'
import {Repository, TQuery} from './repository.js'

type OAd = Ad<Optional>
type RAd = Ad<Required>

export default class AdRepository extends Repository<OAd, RAd> {
  protected readonly DB: string = 'hoarder'
  protected readonly COLLECTION: string = 'ads'
  constructor(opts: {url: string; conf?: MongoOptions}) {
    super(opts)
  }

  async find(query: TQuery<{find: Ad<Optional>}>): Promise<RAd[] | null> {
    return await super.find(query)
  }

  async add(query: TQuery<{fields: Ad<Required>}>): Promise<void> {
    return await super.add(query)
  }

  async update(
    query: TQuery<
      {
        fields: Ad<Optional>
        find: Ad<Optional>
        options: FindOneAndUpdateOptions
      },
      FindOneAndUpdateOptions & {
        includeResultMetadata: true
      }
    >
  ): Promise<boolean> {
    return await super.update(query)
  }

  async dalete(
    query: TQuery<
      {find: Ad<Optional>; options: FindOneAndDeleteOptions},
      FindOneAndUpdateOptions & {
        includeResultMetadata: true
      }
    >
  ): Promise<boolean> {
    return await super.dalete(query)
  }
}
