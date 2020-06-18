import { BASIC_SCHEMA_STRATEGIES, Typeless } from './strategies'

import _ from 'lodash'

export class SchemaNode {
  public activeStrategies: any
  public strategies = BASIC_SCHEMA_STRATEGIES

  constructor() {
    this.activeStrategies = []
  }

  public addSchema(schema: object) {
    if (schema instanceof SchemaNode) {
      schema = schema.toSchema()
    }

    for (const subschema of this.getSubSchemas(schema)) {
      // Delegate to SchemaType object
      const activeStrategy = this.getStrategyForSchema(subschema)
      activeStrategy.addSchema(subschema)
    }

    // Return this for easy method chaining
    return this
  }

  public addObject(obj: object) {
    const activeStrategy = this.getStrategyForObject(obj)
    activeStrategy.addObject(obj)

    return this
  }

  public toSchema() {
    let types = new Set()
    let generatedSchemas = []

    for (const activeStrategy of this.activeStrategies) {
      const generatedSchema = activeStrategy.toSchema()

      if (
        generatedSchema.length === 1 &&
        generatedSchema.hasOwnProperty('type')
      ) {
        types.add(generatedSchema.type)
      } else {
        generatedSchemas.push(generatedSchema)
      }
    }

    if (_.size(types) > 0) {
      let newType

      if (_.size(types) === 1) {
        newType = _.last([...types])
      } else {
        newType = _.orderBy([...types])
      }
      generatedSchemas = [{ type: newType }, ...generatedSchemas]
    }

    let resultSchema

    if (generatedSchemas.length === 1) {
      resultSchema = generatedSchemas[0]
    } else if (!_.isEmpty(generatedSchemas)) {
      resultSchema = { anyOf: generatedSchemas }
    } else {
      return
    }

    return resultSchema
  }

  private getStrategyForObject(obj: object) {
    return this.getStrategyFor('object', obj)
  }

  private getStrategyForSchema(schema: object) {
    return this.getStrategyFor('schema', schema)
  }

  private getStrategyFor(kind: 'object' | 'schema', schemaOrObj: object) {
    const method = _.camelCase('match' + kind)

    for (const activeStrategy of this.activeStrategies) {
      const isMatch = _.invoke(activeStrategy, method, schemaOrObj)

      if (isMatch) {
        return activeStrategy
      }
    }

    // Check all potential types
    for (const strategy of this.strategies) {
      const method = 'match' + _.capitalize(kind)

      const strategyInstance = new strategy()

      const isMatch = _.invoke(strategyInstance, method, schemaOrObj)

      if (isMatch) {
        const activeStrategy = strategyInstance

        // Incorporate typeless strategy if it exists
        if (
          this.activeStrategies &&
          this.activeStrategies[this.activeStrategies.length - 1] instanceof
            Typeless
        ) {
          const typeless = this.activeStrategies.pop()
          activeStrategy.addSchema(typeless.toSchema())
        }

        this.activeStrategies.push(activeStrategy)
        return activeStrategy
      }
    }

    // No match found, if typeless add to first strategy
    const typelessInstance = new Typeless()
    if (kind === 'schema' && typelessInstance.matchSchema(schemaOrObj)) {
      if (this.activeStrategies.length < 1) {
        this.activeStrategies.push(typelessInstance)
      }
      const activeStrategy = this.activeStrategies[0]
      return activeStrategy
    }

    // If no match found, raise an error
    throw new Error(
      `Could not find matching schema type for ${kind}: ${schemaOrObj}`
    )
  }

  private getSubSchemas(schema: any): any {
    if (schema.hasOwnProperty('anyOf')) {
      let subschemas = []
      for (const anyof of schema.anyOf) {
        for (const subschema of this.getSubSchemas(anyof)) {
          subschemas.push(subschema)
        }
      }

      return subschemas
    } else if (_.isArray(_.get(schema, 'type'))) {
      let otherKeys = { ...schema }
      delete otherKeys.type

      let types = []
      for (const t of schema.type) {
        types.push({ type: t, ...otherKeys })
      }
      return types
    } else {
      return [schema]
    }
  }
}
