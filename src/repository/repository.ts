export default interface Repository<T> {
  find(query: {find: T}): T | null | never
  add(query: {fields: T}): T | never
  update(query: {find: T; fields: T}): boolean | never
  dalete(query: {find: T}): boolean | never
}
