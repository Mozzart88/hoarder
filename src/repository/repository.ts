export default interface Repository<Ent> {
  find(query: {find: Ent}): Promise<Ent> | Ent | null | never
  add(query: {fields: Ent}): Promise<Ent> | Ent | never
  update(query: {find: Ent; fields: Ent}): Promise<boolean> | boolean | never
  dalete(query: {find: Ent}): Promise<boolean> | boolean | never
}
