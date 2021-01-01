import {SchemaNode} from './schema-node';
import sortKeys from 'sort-keys';

export default class SchemaBuilder {
	private schemaUri: string;
	private readonly rootNode: SchemaNode;

	constructor(schemaUri = 'http://json-schema.org/draft-07/schema#') {
		this.schemaUri = schemaUri;
		this.rootNode = new SchemaNode();
	}

	public addObject(object: Record<string, any>) {
		this.rootNode.addObject(object);
	}

	public addSchema(schema: Record<string, any>) {
		if (schema instanceof SchemaBuilder || schema instanceof SchemaNode) {
			schema = schema.toSchema();
		}

		if (!this.schemaUri && schema.$schema) {
			this.schemaUri = schema.$schema;
		}

		this.rootNode.addSchema(schema);
	}

	public toSchema() {
		const schema = this.baseSchema();
		return sortKeys({...schema, ...this.rootNode.toSchema()});
	}

	public toPrettySchema() {
		return JSON.stringify(this.toSchema(), null, 2);
	}

	private baseSchema() {
		return {$schema: this.schemaUri};
	}
}
