import Entity from './entity.js'
type tag = `#${string}`
export default interface Tag extends Entity {
  id: number
  name: tag
}
