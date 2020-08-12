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

		for (const [key, value] of Object.entries(object)) {
			if (this.PatternPropertiesStrategy.findPattern(key)) {
				delete object[key];
				continue;
			}

			if (!this.properties[key]) this.properties[key] = new SchemaNode();

			this.properties[key].addObject(value);
		}

		this.requiredStrategy.addObject(object);

		if (!this.disabled.includes('maxProperties'))
			this.maxPropertiesStrategy.addObject(object);

		if (!this.disabled.includes('minProperties'))
			this.minPropertiesStrategy.addObject(object);
	}

	public addSchema(schema: Record<string, any>) {
		super.addSchema(schema);

		const {properties} = schema;

		if (schema.disabled) this.disabled.push(...(schema.disabled as string[]));

		if (properties) {
			this.addSchemaProperties(properties);
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
			if (typeof value.toSchema !== 'function') {
				continue;
			}

			schemaProperties[key] = value.toSchema();
		}

		return _.isEmpty(schemaProperties) ? undefined : schemaProperties;
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
