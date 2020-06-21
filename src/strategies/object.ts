import {SchemaNode} from '../schema-node';
import {SchemaStrategy} from './base';
import _ from 'lodash';

export class ObjectStrategy extends SchemaStrategy {
	properties: any;
	patternProperties: any;
	required: any;
	includeEmptyRequired: boolean;
	keywords = new Set(['type', 'properties', 'patternProperties', 'required']);

	constructor(schemaNode) {
		super(schemaNode);

		this.properties = {};
		this.patternProperties = {};
		this.required = new Set();
		this.includeEmptyRequired = false;
	}

	public addSchema(schema: Record<string, any>) {
		super.addSchema(schema);

		if (schema.properties) {
			for (const [key, value] of _.toPairs(schema.properties)) {
				const subnode = this.properties[key];
				if (!_.isNil(value)) {
					subnode.addSchema(value);
				}
			}
		}

		if (schema.patternProperties) {
			for (const [key, value] of _.toPairs(schema.patternProperties)) {
				const subnode = this.patternProperties[key];

				if (!_.isNil(value)) {
					subnode.addSchema(value);
				}
			}
		}

		if (schema.required) {
			const required = new Set(schema.required);

			if (!required) {
				this.includeEmptyRequired = true;
			}

			if (_.isNil(this.required)) {
				this.required = required;
			} else {
				this.required.add(required);
			}
		}
	}

	public addObject(object: Record<string, unknown>) {
		const properties = new Set();

		for (const [key, value] of _.toPairs(object)) {
			let pattern = null;

			if (!this.properties.key) {
				pattern = this.findPattern(key);
			}

			if (_.isNil(pattern)) {
				properties.add(key);

				if (!this.properties[key]) {
					this.properties[key] = new SchemaNode();
				}

				this.properties[key].addObject(value);
			} else {
				this.patternProperties[pattern].addObject(value);
			}
		}

		if (_.isNil(this.required) || this.required.size === 0) {
			this.required = properties;
		} else {
			const newRequirements = _.intersection(
				[...properties],
				[...this.required]
			);

			this.required = new Set(newRequirements);
		}
	}

	public matchObject(object: any) {
		return _.isPlainObject(object);
	}

	public matchSchema(schema: any) {
		return _.get(schema, 'type') === 'object';
	}

	public toSchema() {
		const schema = super.toSchema();
		schema.type = 'object';

		if (this.properties) {
			schema.properties = this.propertiesToSchema(this.properties);
		}

		if (
			!_.isNil(this.patternProperties) &&
			!_.isEmpty(this.patternProperties)
		) {
			schema.patternProperties = this.propertiesToSchema(
				this.patternProperties
			);
		}

		if (this.required || this.includeEmptyRequired) {
			schema.required = _.orderBy([...this.required]);
		}

		return schema;
	}

	public propertiesToSchema(properties: any) {
		const schemaProperties = {};

		for (const [key, value] of _.toPairs(properties)) {
			schemaProperties[key] = (value as SchemaNode).toSchema();
		}

		return schemaProperties;
	}

	private findPattern(prop: string) {
		for (const pattern of _.keys(this.patternProperties)) {
			if (pattern.includes(prop)) {
				return pattern;
			}
		}

		return null;
	}
}
