import {SchemaNode} from '../../schema-node';
import {SchemaStrategy} from '../schema-strategy';
import _ from 'lodash';

export class ArrayStrategy extends SchemaStrategy {
	public keywords = new Set(['type', 'items']);
	public items: SchemaNode;

	constructor(schemaNode) {
		super(schemaNode);
		this.items = new SchemaNode();
	}

	public matchObject(object: any) {
		return _.isArray(object);
	}

	public matchSchema(schema: any) {
		return (
			_.get(schema, 'type') === 'array' &&
			_.isPlainObject(_.get(schema, 'items', {}))
		);
	}

	public addObject(array: any[]) {
		for (const item of array) {
			this.items.addObject(item);
		}
	}

	public addSchema(schema: any) {
		super.addSchema(schema);
		if (schema.items) {
			this.items.addSchema(schema.items);
		}
	}

	public toSchema() {
		const schema = super.toSchema();
		schema.type = 'array';

		if (this.items) {
			const items = this.items.toSchema();

			if (items?.anyOf && Array.isArray(items.anyOf)) {
				console.log(items.anyOf);
				items.anyOf = _.uniqWith(items.anyOf, _.isEqual);
				console.log(items.anyOf);
			}

			schema.items = items;
		}

		return schema;
	}
}
