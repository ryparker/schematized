import {SchemaNode} from '../../schema-node';
import _ from 'lodash';

export class PatternProperties {
	public keywords = new Set(['patternProperties']);
	public patternProperties = {};

	public addObject(object: Record<string, unknown>) {
		if (_.isEmpty(this.patternProperties)) {
			return;
		}

		for (const [key, value] of Object.entries(object)) {
			const pattern = this.findPattern(key);

			if (pattern) {
				this.patternProperties[pattern].addObject(value);
			}
		}
	}

	public addSchema(schema: Record<string, any>) {
		if (schema.patternProperties) {
			for (const [key, value] of Object.entries(schema.patternProperties)) {
				if (value) {
					if (!this.patternProperties[key]) {
						this.patternProperties[key] = new SchemaNode();
					}

					this.patternProperties[key].addSchema(value);
				}
			}
		}
	}

	public toSchema() {
		if (_.isEmpty(this.patternProperties)) {
			return undefined;
		}

		return {
			patternProperties: this.propertiesToSchema(this.patternProperties)
		};
	}

	public findPattern(prop: string) {
		for (const pattern of Object.keys(this.patternProperties)) {
			const re = new RegExp(pattern);
			if (re.test(prop)) {
				return pattern;
			}
		}

		return null;
	}

	public filterProperties(properties: Record<string, any>) {
		const patterns = Object.keys(this.patternProperties);
		return properties.filter((property) =>
			patterns.find((pattern) => new RegExp(pattern).test(property))
		);
	}

	private propertiesToSchema(properties: any) {
		const schemaProperties = {};

		for (const [key, value] of Object.entries(properties)) {
			schemaProperties[key] = (value as SchemaNode).toSchema();
		}

		return schemaProperties;
	}
}
