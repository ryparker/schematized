import { SchemaStrategy, TypedSchemaStrategy } from './base'

import _ from 'lodash'

export class Typeless extends SchemaStrategy {
  public matchSchema(schema: any) {
    return !_.includes(schema, 'type')
  }

  public matchObject(_obj: any) {
    return false
  }
}

export class Boolean extends TypedSchemaStrategy {
  public type = 'boolean'

  public matchObject(obj: any) {
    return _.isBoolean(obj)
  }
}

export class String extends TypedSchemaStrategy {
  public type = 'string'

  public matchObject(obj: any) {
    return _.isString(obj)
  }
}

export class Number extends TypedSchemaStrategy {
  public type = 'number'

  public matchObject(obj: any) {
    return _.isNumber(obj)
  }
}

export class Integer extends TypedSchemaStrategy {
  public type = 'integer'

  public matchObject(obj: any) {
    return _.isInteger(obj)
  }
}

export class Null extends TypedSchemaStrategy {
  public type = 'null'

  public matchObject(obj: any) {
    return _.isNull(obj)
  }
}

// export class Number extends SchemaStrategy {
//   public types: any

//   constructor() {
//     super()
//     this.types = ['integer', 'number']
//     this.type = 'integer'
//   }

//   public matchSchema(schema: any) {
//     return this.types.includes(_.get(schema, 'type'))
//   }

//   public matchObject(obj: any) {
//     console.log('scalar.Number.matchObject()')
//     return _.isNumber(obj) || _.isInteger(obj)
//   }

//   public addSchema(schema: any) {
//     super.addSchema(schema)
//     if (_.get(schema, 'type') === 'number') {
//       this.type = 'number'
//     }
//   }

//   public addObject(obj: number) {
//     if (_.isInteger(obj)) {
//       this.type = 'integer'
//     } else if (_.isNumber(obj)) {
//       this.type = 'number'
//     }
//   }

//   public toSchema() {
//     const schema = super.toSchema()
//     schema['type'] = this.type
//     return schema
//   }
// }
