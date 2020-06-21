import {SchemaStrategy} from '../schema-strategy';
import _ from 'lodash';

export class TypelessStrategy extends SchemaStrategy {
	public matchObject(_object: any) {
		return false;
	}

	public matchSchema(schema: Record<string, unknown>) {
		return !_.includes(schema, 'type');
	}
}
