import {AdditionalProperties} from './additional-properties';
import {MaxProperties} from './max-properties';
import {MinProperties} from './min-properties';
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
	private readonly maxPropertiesStrategy: MaxProperties;
	private readonly minPropertiesStrategy: MinProperties;

	constructor(schemaNode) {
		super(schemaNode);

		this.properties = {};
		this.PatternPropertiesStrategy = new PatternProperties();
		this.requiredStrategy = new Required();
		this.additionalPropertiesStrategy = new AdditionalProperties();
		this.maxPropertiesStrategy = new MaxProperties();
		this.minPropertiesStrategy = new MinProperties();
	}

	public matchObject(object: any) {
		return _.isPlainObject(object);
	}

	public matchSchema(schema: any) {
		return _.get(schema, 'type') === 'object';
	}

	public addObject(object: Record<string, any>) {
		this.PatternPropertiesStrategy.addObject(object);

		for (const [key, value] of Object.entries(object)) {
			if (this.PatternPropertiesStrategy.findPattern(key)) {
				delete object[key];
				continue;
			}

			if (!this.properties[key]) this.properties[key] = new SchemaNode();

			this.properties[key].addObject(value);
		}

		this.requiredStrategy.addObject(object);
		this.maxPropertiesStrategy.addObject(object);
		this.minPropertiesStrategy.addObject(object);
	}

	public addSchema(schema: Record<string, any>) {
		super.addSchema(schema);

		const {properties} = schema;

		if (properties) {
			for (const [key, value] of Object.entries(properties)) {
				if (value) {
					if (!(this.properties[key] instanceof SchemaNode)) {
						this.properties[key] = new SchemaNode();
					}

					this.properties[key].addSchema(value);
				}
			}
		}

		this.PatternPropertiesStrategy.addSchema(schema);
		this.requiredStrategy.addSchema(schema);
		this.additionalPropertiesStrategy.addSchema(schema);
		this.maxPropertiesStrategy.addSchema(schema);
		this.minPropertiesStrategy.addSchema(schema);
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

		if (!schema.patternProperties)
			schema = {...schema, ...this.maxPropertiesStrategy.toSchema()};

		if (!schema.patternProperties)
			schema = {...schema, ...this.minPropertiesStrategy.toSchema()};

		return schema;
	}

	private propertiesToSchema(properties: Record<string, SchemaNode>) {
		const schemaProperties = {};

		for (const [key, value] of _.toPairs(properties)) {
			schemaProperties[key] = value.toSchema();
		}

		return _.isEmpty(schemaProperties) ? undefined : schemaProperties;
	}
}
