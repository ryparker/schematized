import _ from 'lodash';

export class Minimum {
	public keywords = new Set(['minimum']);
	public minimum: number | null = null;

	public addObject(number: number) {
		this.minimum = _.isNil(this.minimum)
			? number
			: Math.min(this.minimum, number);
	}

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(schema.minimum)) {
			return;
		}

		if (_.isNil(this.minimum)) {
			this.minimum = schema.minimum;
			return;
		}

		this.minimum = Math.min(this.minimum, schema.minimum);
	}

	public toSchema() {
		if (!_.isNumber(this.minimum)) {
			return {};
		}

		return {minimum: this.minimum};
	}
}
