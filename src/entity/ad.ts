import {Category} from './category.js'
import {Type} from './type.js'
import User from './user.js'
import Tag from './tag.js'
import {ObjectId} from 'mongodb'

const types = ['new', 'active', 'sold', 'inactive'] as const

type Status = (typeof types)[number]

export interface Required {
  _id?: ObjectId
  title: string
  description: string
  price: number
  category: Category<{_id: ObjectId; name: string}>
  subCategory: string
  type: Type<{_id: ObjectId; name: string}>
  subType: string
  user: User
  satus: Status
  tags?: Tag[]
  date: number
}

export interface Optional {
  _id?: ObjectId
  title?: string
  description?: string
  price?: number
  category?: Category<{_id: ObjectId; name: string}>
  subCategory?: string
  type?: Type<{_id: ObjectId; name: string}>
  subType?: string
  user?: User
  satus?: Status
  tags?: Tag[]
  date?: number
}

export type Ad<T extends Optional | Required> = T
