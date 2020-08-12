import _ from 'lodash';

export class Maximum {
	public keywords = new Set(['maximum']);
	public max: number | null = null;

	public addObject(number: number) {
		this.max = _.isNil(this.max) ? number : Math.max(this.max, number);
	}

	public addSchema(schema: Record<string, any>) {
		if (schema.maximum) {
			this.max = Math.max(this.max, schema.maximum);
		}
	}

	public toSchema() {
		if (!this.max) return undefined;

		return {maximum: this.max};
	}
}
