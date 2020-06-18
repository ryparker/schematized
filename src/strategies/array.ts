import {SchemaNode} from '../node';
import {SchemaStrategy} from './base';
import _ from 'lodash';

export class Array extends SchemaStrategy {
	public keywords = new Set(['type', 'items']);
	public items: any;

	constructor() {
		super();
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

	public addSchema(schema: any) {
		super.addSchema(schema);
		if (schema.items) {
			this.items.addSchema(schema.items);
		}
	}

	public addObject(object: any) {
		for (const item of object) {
			this.items.addObject(item);
		}
	}

	public toSchema() {
		const schema = super.toSchema();
		schema.type = 'array';

		if (this.items) {
			schema.items = this.items.toSchema();
		}

		return schema;
	}
}
