import Category from './category.js'
import Entity from './entity.js'
import SubCategory from './subCategory.js'
import SubType from './subType.js'
import Type from './type.js'
import User from './user.js'
import Tag from './tag.js'

const types = ['new', 'active', 'sold', 'inactive'] as const

type Status = (typeof types)[number]

export default interface Ad extends Entity {
  id?: string
  title?: string
  description?: string
  price?: number
  category?: Category
  subCategory?: SubCategory
  type?: Type
  subType?: SubType
  user?: User
  satus?: Status
  tags?: Tag[]
  date?: number
}
