import { SchemaNode } from './../node'
import { SchemaStrategy } from './base'
import _ from 'lodash'

export class Array extends SchemaStrategy {
  public keywords = new Set(['type', 'items'])
  public items: any

  constructor() {
    super()
    this.items = new SchemaNode()
  }

  public matchObject(obj: any) {
    return _.isArray(obj)
  }

  public matchSchema(schema: any) {
    return (
      _.get(schema, 'type') === 'array' &&
      _.isPlainObject(_.get(schema, 'items', {}))
    )
  }

  public addSchema(schema: any) {
    super.addSchema(schema)
    if (schema.hasOwnProperty('items')) {
      this.items.addSchema(schema.items)
    }
  }

  public addObject(obj: any) {
    console.log('obj: ', obj)
    for (const item of obj) {
      console.log('item: ', item)
      this.items.addObject(item)
    }
  }

  public toSchema() {
    const schema = super.toSchema()
    schema.type = 'array'

    if (this.hasOwnProperty('items')) {
      schema.items = this.items.toSchema()
    }

    return schema
  }
}
