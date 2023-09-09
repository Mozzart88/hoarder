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

export interface Repository<
  OEnt extends Ent<Optional>,
  REnt extends Ent<Required>,
> {
  find(query: TQuery<QFind<OEnt>>): Promise<REnt[] | null> | never
  add(query: TQuery<QFields<REnt>>): Promise<void> | never
  update(query: TQuery<QFind<OEnt> & QFields<OEnt>>): Promise<boolean> | never
  dalete(query: TQuery<QFind<OEnt>>): Promise<boolean> | never
}
