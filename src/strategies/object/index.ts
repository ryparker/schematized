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
	public disabled: string[];
	public readonly keywords = new Set(['type', 'properties']);
	private readonly PatternPropertiesStrategy: PatternProperties;
	private readonly requiredStrategy: Required;
	private readonly additionalPropertiesStrategy: AdditionalProperties;
	private readonly maxPropertiesStrategy: MaxProperties;
	private readonly minPropertiesStrategy: MinProperties;

	constructor(schemaNode) {
		super(schemaNode);

		this.disabled = [];
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

		const objectWithoutPatterns: Record<string, any> = _.omit(
			object,
			this.PatternPropertiesStrategy.matchingPropertyKeys
		);

		for (const [key, value] of Object.entries(objectWithoutPatterns)) {
			if (!this.properties[key]) this.properties[key] = new SchemaNode();

			this.properties[key].addObject(value);
		}

		if (!this.disabled.includes('required'))
			this.requiredStrategy.addObject(object);

		if (!this.disabled.includes('maxProperties'))
			this.maxPropertiesStrategy.addObject(object);

		if (!this.disabled.includes('minProperties'))
			this.minPropertiesStrategy.addObject(object);
	}

	public addSchema(schema: Record<string, any>) {
		super.addSchema(schema);

		if (schema.disabled) {
			this.disabled.push(...(schema.disabled as string[]));
		}

		if (schema.properties) {
			this.addSchemaProperties(schema.properties);
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
			const schemaProperties = this.propertiesToSchema(this.properties);

			if (!_.isEmpty(schemaProperties)) {
				schema.properties = schemaProperties;
			}
		}

		schema = {
			...schema,
			...this.PatternPropertiesStrategy.toSchema(),
			...this.requiredStrategy.toSchema(),
			...this.additionalPropertiesStrategy.toSchema()
		};

		if (!schema.patternProperties) {
			schema = {
				...schema,
				...this.maxPropertiesStrategy.toSchema(),
				...this.minPropertiesStrategy.toSchema()
			};
		}

		return schema;
	}

	private propertiesToSchema(properties: Record<string, SchemaNode>) {
		const schemaProperties = {};

		for (const [key, value] of _.toPairs(properties)) {
			const schema = value.toSchema();

			if (!schema) {
				continue;
			}

			schemaProperties[key] = schema;
		}

		return schemaProperties;
	}

	private addSchemaProperties(properties: Record<string, SchemaNode>) {
		for (const [key, value] of Object.entries(properties)) {
			if (!value) {
				continue;
			}

			if (!(this.properties[key] instanceof SchemaNode)) {
				this.properties[key] = new SchemaNode();
			}

			this.properties[key].addSchema(value);
		}
	}
}
