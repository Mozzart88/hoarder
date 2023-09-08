import Ad from '../entity/ad.js'
import Repository from './repository.js'

export default class AdRepository implements Repository<Ad> {
  private url: string
  constructor(opt: {url: string}) {
    this.url = opt.url
  }
  find(query: {find: Ad}): Ad | null {
    void query
    throw new Error('Method not implemented.')
  }
  add(query: {fields: Ad}): Ad {
    void query
    throw new Error('Method not implemented.')
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
