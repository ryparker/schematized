import { SchemaNode } from './../node'
import { SchemaStrategy } from './base'
import _ from 'lodash'

export class ObjectS extends SchemaStrategy {
  properties: any
  patternProperties: any
  required: any
  includeEmptyRequired: boolean
  keywords = new Set(['type', 'properties', 'patternProperties', 'required'])

  constructor() {
    super()

    this.properties = {}
    this.patternProperties = {}
    this.required = new Set()
    this.includeEmptyRequired = false
  }

  public addSchema(schema: any) {
    super.addSchema(schema)

    if (schema.hasOwnProperty('properties')) {
      for (const [key, value] of _.toPairs(schema.properties)) {
        const subnode = this.properties[key]
        if (!_.isNil(value)) {
          subnode.addSchema(value)
        }
      }
    }

    if (schema.hasOwnProperty('patternProperties')) {
      for (const [key, value] of _.toPairs(schema.patternProperties)) {
        const subnode = this.patternProperties[key]

        if (!_.isNil(value)) {
          subnode.addSchema(value)
        }
      }
    }

    if (schema.hasOwnProperty('required')) {
      const required = new Set(schema.required)

      if (!required) {
        this.includeEmptyRequired = true
      }

      if (_.isNil(this.required)) {
        this.required = required
      } else {
        this.required.add(required)
      }
    }
  }

  public addObject(obj: any) {
    let properties = new Set()

    for (const [key, value] of _.toPairs(obj)) {
      let pattern = null

      if (!this.properties.hasOwnProperty(key)) {
        pattern = this.findPattern(key)
      }

      if (!_.isNil(pattern)) {
        this.patternProperties[pattern].addObject(value)
      } else {
        properties.add(key)

        if (!this.properties[key]) {
          this.properties[key] = new SchemaNode()
        }
        this.properties[key].addObject(value)
      }
    }

    if (_.isNil(this.required)) {
      this.required = properties
    } else {
      this.required = new Set([...properties, ...properties])
    }
  }

  public matchObject(obj: any) {
    return _.isPlainObject(obj)
  }

  public matchSchema(schema: any) {
    return _.get(schema, 'type') === 'object'
  }

  public toSchema() {
    let schema = super.toSchema()
    schema['type'] = 'object'

    if (this.properties) {
      schema['properties'] = this.propertiesToSchema(this.properties)
    }

    if (
      !_.isNil(this.patternProperties) &&
      !_.isEmpty(this.patternProperties)
    ) {
      schema['patternProperties'] = this.propertiesToSchema(
        this.patternProperties
      )
    }

    if (this.required || this.includeEmptyRequired) {
      schema['required'] = [...this.required].sort()
    }

    return schema
  }

  public propertiesToSchema(properties: any) {
    let schemaProperties = {}

    for (const [key, value] of _.toPairs(properties)) {
      schemaProperties[key] = (value as any).toSchema()
    }

    return schemaProperties
  }

  private findPattern(prop: string): string | void {
    for (const pattern of _.keys(this.patternProperties)) {
      if (pattern.includes(prop)) {
        return pattern
      }
    }
  }
}
