import {ArrayStrategy} from './array';
import {BooleanStrategy} from './boolean';
import {NullStrategy} from './null';
import {NumberStrategy} from './number';
import {ObjectStrategy} from './object';
import {StringStrategy} from './string';

export const BASIC_SCHEMA_STRATEGIES = [
	BooleanStrategy,
	NullStrategy,
	NumberStrategy,
	StringStrategy,
	ArrayStrategy,
	ObjectStrategy
];

export {TypelessStrategy} from './typeless';
