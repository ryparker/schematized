import { SchemaNode } from './node'
import _ from 'lodash'

const DEFAULT_URI = 'http://json-schema.org/schema#'

export class SchemaBuilder {
  private schemaUri: string | null
  private rootNode: SchemaNode

  constructor(schemaUri = 'http://json-schema.org/schema#') {
    this.schemaUri = schemaUri
    this.rootNode = new SchemaNode()
  }

  public addObject(obj: object) {
    this.rootNode.addObject(obj)
  }

  public addSchema(schema: any) {
    if (schema instanceof SchemaBuilder) {
      const schemaUri = schema.schemaUri
      schema = schema.toSchema()

      if (_.isNil(schemaUri)) {
        delete schema['$schema']
      }
    } else if (schema instanceof SchemaNode) {
      schema = schema.toSchema()
    }

    if (_.includes(schema, '$schema')) {
      this.schemaUri = this.schemaUri || schema['$schema']
      schema = _.clone(schema)
      delete schema['$schema']
    }

    this.rootNode.addSchema(schema)
  }

  public toSchema() {
    let schema = this.baseSchema()
    return _.merge(schema, this.rootNode.toSchema())
  }

  public toJson() {
    return JSON.stringify(this.toSchema(), null, 2)
  }

  private baseSchema() {
    if (this.schemaUri === 'null') return {}
    return { $schema: this.schemaUri || DEFAULT_URI }
  }
}
