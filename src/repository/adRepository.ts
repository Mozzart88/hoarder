import {Collection, Db, MongoClient, MongoOptions} from 'mongodb'
import Ad from '../entity/ad.js'
import Repository from './repository.js'

export default class AdRepository implements Repository<Ad> {
  private client: MongoClient
  db: Db
  collection: Collection
  constructor(opts: {url: string; conf?: MongoOptions}) {
    this.client = new MongoClient(opts.url, opts.conf)
    this.db = this.client.db('hoarder')
    this.collection = this.db.collection('ads')
  }
  find(query: {find: Ad}): Ad | null {
    void query
    throw new Error('Method not implemented.')
  }
  async add(query: {fields: Ad}): Promise<Ad> {
    try {
      const res = await this.collection.insertOne(query.fields)
      if (res.acknowledged !== true) throw new Error('acknowledgis failed')
      query.fields.id = res.insertedId.toString('hex')
      return query.fields
    } finally {
      await this.client.close()
    }
  }
  update(query: {find: Ad; fields: Ad}): boolean {
    void query
    throw new Error('Method not implemented.')
  }
  dalete(query: {find: Ad}): boolean {
    void query
    throw new Error('Method not implemented.')
  }
}
