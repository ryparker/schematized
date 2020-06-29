import _ from 'lodash';

export class MaxProperties {
	public keywords = new Set(['maxProperties']);
	public maxProperties: number | null = null;

	public addObject(object: Record<string, unknown>) {
		this.maxProperties = _.isNil(this.maxProperties)
			? _.size(object)
			: Math.max(this.maxProperties, _.size(object));
	}

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(this.maxProperties)) {
			this.maxProperties = _.get(schema, 'maxProperties');
		} else if (schema.maxProperties) {
			this.maxProperties = Math.max(this.maxProperties, schema.maxProperties);
		}
	}

	public toSchema() {
		if (this.maxProperties === 0) return undefined;

		return {maxProperties: Math.round(this.maxProperties)};
	}
}
