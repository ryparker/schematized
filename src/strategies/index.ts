import {Boolean, Integer, Null} from './scalar';

import {ArrayStrategy} from './array';
import {NumberStrategy} from './number';
import {ObjectStrategy} from './object';
import {StringStrategy} from './string';

export const BASIC_SCHEMA_STRATEGIES = [
	Boolean,
	Null,
	NumberStrategy,
	Integer,
	StringStrategy,
	ArrayStrategy,
	ObjectStrategy
];
