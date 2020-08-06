import _ from 'lodash';

export class MinProperties {
	public keywords = new Set(['minProperties']);
	public minProperties: number | null = null;

	public addObject(object: Record<string, unknown>) {
		this.minProperties = _.isNil(this.minProperties)
			? _.size(object)
			: Math.min(this.minProperties, _.size(object));
	}

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(this.minProperties)) {
			this.minProperties = _.get(schema, 'minProperties');
		} else if (schema.minProperties) {
			this.minProperties = Math.min(this.minProperties, schema.minProperties);
		}
	}

	public toSchema() {
		if (!this.minProperties) return undefined;

		return {minProperties: Math.round(this.minProperties)};
	}
}
