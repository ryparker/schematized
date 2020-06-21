import {TypedSchemaStrategy} from '../typed-schema-strategy';
import _ from 'lodash';

export class NullStrategy extends TypedSchemaStrategy {
	public type = 'null';

	public matchObject(object: any) {
		return _.isNull(object);
	}
}
