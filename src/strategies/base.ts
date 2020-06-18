import { SchemaNode } from './../node'
import _ from 'lodash'

export abstract class SchemaStrategy extends Object {
  keywords = new Set(['type'])
  nodeClass: SchemaNode
  extraKeywords: any
  public type: string

  constructor() {
    super()
    this.nodeClass = new SchemaNode()
    this.extraKeywords = {}
  }

  public addObject(obj: any) {
    return
  }

  public addSchema(schema: any) {
    this.addExtraKeywords(schema)
  }

  public addExtraKeywords(schema: any) {
    for (const [key, value] of _.toPairs(schema)) {
      if (!this.keywords.has(key)) {
        if (!this.extraKeywords.hasOwnProperty(key)) {
          this.extraKeywords[key] = value
        } else if (this.extraKeywords[key] !== value) {
          console.warn('Schema incompatible.')
        }
      }
    }
  }

  public matchSchema(schema: any) {
    throw new Error('matchSchema not implemented')
  }

  public matchObject(obj: any) {
    throw new Error('matchObject not implemented')
  }

  public toSchema() {
    return { ...this.extraKeywords }
  }
}

export abstract class TypedSchemaStrategy extends SchemaStrategy {
  public type: string

  public matchSchema(schema: any) {
    return _.get(schema, 'type') === this.type
  }

  public toSchema() {
    let schema = super.toSchema()
    schema['type'] = this.type
    return schema
  }
}
