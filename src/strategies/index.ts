import { Boolean, Integer, Null, Number, String } from './scalar'

import { Array } from './array'
import { ObjectS } from './object'

export { Typeless } from './scalar'

export const BASIC_SCHEMA_STRATEGIES = [
  Boolean,
  Null,
  Number,
  Integer,
  String,
  Array,
  ObjectS,
]
