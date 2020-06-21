import {SchemaStrategy} from './schema-strategy';
import _ from 'lodash';

export abstract class TypedSchemaStrategy extends SchemaStrategy {
	public matchSchema(schema: Record<string, unknown>) {
		return _.get(schema, 'type') === this.type;
	}

	public toSchema() {
		const schema = super.toSchema();
		schema.type = this.type;
		return schema;
	}
}
