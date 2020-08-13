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
		if (_.isNil(schema.minProperties)) {
			return;
		}

		if (_.isNil(this.minProperties)) {
			this.minProperties = schema.minProperties;
			return;
		}

		this.minProperties = Math.min(this.minProperties, schema.minProperties);
	}

	public toSchema() {
		if (!_.isNumber(this.minProperties)) {
			return {};
		}

		return {minProperties: Math.round(this.minProperties)};
	}
}
