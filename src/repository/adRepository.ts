import {
  Collection,
  FindOneAndUpdateOptions,
  MongoClient,
  MongoOptions,
} from 'mongodb'
import {Ad, Optional, Required} from '../entity/ad.js'
import {Repository, TQuery} from './repository.js'

type OAd = Ad<Optional>
type RAd = Ad<Required>

export default class AdRepository implements Repository<OAd, RAd> {
  private client: MongoClient
  private db: string
  private collection: string
  constructor(opts: {url: string; conf?: MongoOptions}) {
    this.client = new MongoClient(opts.url, opts.conf)
    this.db = 'hoarder'
    this.collection = 'ads'
  }
  private async connect(): Promise<Collection<Ad<Required>>> {
    const client = await this.client.connect()
    return client.db(this.db).collection(this.collection)
  }

  private async close() {
    await this.client.close()
  }

  async find(query: TQuery<{find: Ad<Optional>}>): Promise<RAd[] | null> {
    const {find, options} = query
    try {
      const collection = await this.connect()
      const res = await collection.find(find, options).toArray()
      if (res.length === 0) return null
      return res as RAd[]
    } finally {
      await this.close()
    }
  }

  async add(query: TQuery<{fields: Ad<Required>}>): Promise<void> {
    const {fields, options} = query
    try {
      const collection = await this.connect()
      const res = await collection.insertOne(fields, options)
      if (res.acknowledged !== true) throw new Error('acknowledgis failed')
    } finally {
      await this.client.close()
    }
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
    const {fields, find, options} = query
    try {
      const collection = await this.connect()
      await collection.findOneAndUpdate(find, {$set: fields}, options)
      return true
    } finally {
      await this.close()
    }
  }

  dalete(query: TQuery<{find: Ad<Optional>}>): Promise<boolean> {
    void query
    throw new Error('Method not implemented.')
  }
}
