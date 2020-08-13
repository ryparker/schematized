import _ from 'lodash';

export class Maximum {
	public keywords = new Set(['maximum']);
	public maximum: number | null = null;

	public addObject(number: number) {
		this.maximum = _.isNil(this.maximum)
			? number
			: Math.max(this.maximum, number);
	}

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(schema.maximum)) {
			return;
		}

		if (_.isNil(this.maximum)) {
			this.maximum = schema.maximum;
			return;
		}

		this.maximum = Math.max(this.maximum, schema.maximum);
	}

	public toSchema() {
		if (!_.isNumber(this.maximum) || this.maximum === 0) {
			return {};
		}

		return {maximum: this.maximum};
	}
}
