import _ from 'lodash';

export class Minimum {
	public keywords = new Set(['minimum']);
	public min: number | null = null;

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(this.min)) {
			this.min = _.get(schema, 'minimum');
		} else if (schema.minimum) {
			this.min = Math.min(this.min, schema.minimum);
		}
	}

	public addObject(number: number) {
		this.min = _.isNil(this.min) ? number : Math.min(this.min, number);
	}

	public toSchema() {
		return {minimum: this.min};
	}
}
