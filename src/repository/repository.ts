import {
  Collection,
  FindOneAndDeleteOptions,
  FindOneAndUpdateOptions,
  MongoClient,
  MongoOptions,
  OptionalId,
} from 'mongodb'

interface Optional {}
interface Required {}

type Ent<T extends Optional | Required> = T

interface Query<T extends object> {
  options?: T
}
interface QFind<Ent> {
  find: Ent
}
interface QFields<Ent> {
  fields: Ent
}

export type TQuery<
  T extends QFind<Ent<Optional | Required>> | QFields<Ent<Optional | Required>>,
  OPS extends object = object,
> = T & Query<OPS>

export abstract class Repository<
  OEnt extends Ent<Optional>,
  REnt extends Ent<Required> = OEnt,
> {
  protected client: MongoClient
  protected readonly DB: string = ''
  protected readonly COLLECTION: string = ''

  constructor(options: {url: string; conf?: MongoOptions}) {
    this.client = new MongoClient(options.url, options.conf)
  }

  protected async connect(): Promise<Collection<Document>> {
    const client = await this.client.connect()
    return client.db(this.DB).collection(this.COLLECTION)
  }

  protected async close() {
    await this.client.close()
  }

  async find(query: TQuery<{find: object}>): Promise<REnt[] | null> | never {
    const {find, options} = query
    try {
      const collection = await this.connect()
      const res = await collection.find(find, options).toArray()
      if (res.length === 0) return null
      return res as unknown as REnt[]
    } finally {
      await this.close()
    }
  }

  async add(query: TQuery<{fields: object}>): Promise<void> {
    const {fields, options} = query
    try {
      const collection = await this.connect()
      const res = await collection.insertOne(
        fields as unknown as OptionalId<Document>,
        options
      )
      if (res.acknowledged !== true) throw new Error('acknowledgis failed')
    } finally {
      await this.client.close()
    }
  }

  async update(
    query: TQuery<
      {
        fields: object
        find: object
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
      {find: object; options: FindOneAndDeleteOptions},
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
