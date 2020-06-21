import {TypedSchemaStrategy} from '../typed-schema-strategy';
import _ from 'lodash';

export class BooleanStrategy extends TypedSchemaStrategy {
	public type = 'boolean';

	public matchObject(object: any) {
		return _.isBoolean(object);
	}
}
