import _ from 'lodash';

export class Minimum {
	public keywords = new Set(['minimum']);
	public min: number | null = null;

	public addObject(number: number) {
		this.min = _.isNil(this.min) ? number : Math.min(this.min, number);
	}

	public addSchema(schema: Record<string, any>) {
		if (schema.minimum) {
			this.min = Math.min(this.min, schema.minimum);
		}
	}

	public toSchema() {
		if (!this.min) return undefined;

		return {minimum: this.min};
	}
}
