import {SchemaStrategy, TypedSchemaStrategy} from './base';

import _ from 'lodash';

export class Typeless extends SchemaStrategy {
	public matchSchema(schema: Record<string, unknown>) {
		return !_.includes(schema, 'type');
	}

	public matchObject(_object: any) {
		return false;
	}
}

export class Boolean extends TypedSchemaStrategy {
	public type = 'boolean';

	public matchObject(object: any) {
		return _.isBoolean(object);
	}
}

export class Integer extends TypedSchemaStrategy {
	public type = 'integer';

	public matchObject(object: any) {
		return _.isInteger(object);
	}
}

export class Null extends TypedSchemaStrategy {
	public type = 'null';

	public matchObject(object: any) {
		return _.isNull(object);
	}
}
