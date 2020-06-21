import {AdditionalProperties} from './additional-properties';
import {PatternProperties} from './pattern-properties';
import {Required} from './required';
import {SchemaNode} from '../../schema-node';
import {SchemaStrategy} from '../schema-strategy';
import _ from 'lodash';

export class ObjectStrategy extends SchemaStrategy {
	public properties: Record<string, SchemaNode>;
	public keywords = new Set(['type', 'properties']);
	private readonly PatternPropertiesStrategy: PatternProperties;
	private readonly requiredStrategy: Required;
	private readonly additionalPropertiesStrategy: AdditionalProperties;

	constructor(schemaNode) {
		super(schemaNode);

		this.properties = {};
		this.PatternPropertiesStrategy = new PatternProperties();
		this.requiredStrategy = new Required();
		this.additionalPropertiesStrategy = new AdditionalProperties();
	}

	public matchObject(object: any) {
		return _.isPlainObject(object);
	}

	public matchSchema(schema: any) {
		return _.get(schema, 'type') === 'object';
	}

	public addObject(object: Record<string, any>) {
		for (const [key, value] of Object.entries(object)) {
			if (!this.properties[key]) {
				this.properties[key] = new SchemaNode();
			}

			this.properties[key].addObject(value);
		}

		this.PatternPropertiesStrategy.addObject(object);
		this.requiredStrategy.addObject(object);
	}

	public addSchema(schema: Record<string, any>) {
		super.addSchema(schema);

		const {properties} = schema;

		if (properties) {
			for (const [key, value] of Object.entries(properties)) {
				if (value) {
					if (this.properties[key]) {
						this.properties[key] = new SchemaNode();
					}

					this.properties[key].addSchema(value);
				}
			}
		}

		this.PatternPropertiesStrategy.addSchema(schema);
		this.requiredStrategy.addSchema(schema);
		this.additionalPropertiesStrategy.addSchema(schema);
	}

	public toSchema() {
		let schema = super.toSchema();
		schema.type = 'object';

		if (this.properties) {
			schema.properties = this.propertiesToSchema(this.properties);
		}

		schema = {...schema, ...this.PatternPropertiesStrategy.toSchema()};
		schema = {...schema, ...this.requiredStrategy.toSchema()};
		schema = {...schema, ...this.additionalPropertiesStrategy.toSchema()};

		return schema;
	}

	private propertiesToSchema(properties: any) {
		const schemaProperties = {};

		for (const [key, value] of _.toPairs(properties)) {
			schemaProperties[key] = (value as SchemaNode).toSchema();
		}

		return schemaProperties;
	}
}
