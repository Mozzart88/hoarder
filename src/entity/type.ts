import {ObjectId} from 'mongodb'

export type Optional = {
  _id?: ObjectId
  name?: string
  sub?: Array<string>
}

export type Required = {
  name: string
  sub: Array<string>
} & Optional

export type Type<T extends Required | Optional> = T
