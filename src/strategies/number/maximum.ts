import _ from 'lodash';

export class Maximum {
	public keywords = new Set(['maximum']);
	public max: number | null = null;

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(this.max)) {
			this.max = _.get(schema, 'maximum');
		} else if (schema.maximum) {
			this.max = Math.max(this.max, schema.maximum);
		}
	}

	public addObject(number: number) {
		this.max = _.isNil(this.max) ? number : Math.max(this.max, number);
	}

	public toSchema() {
		return {maximum: this.max};
	}
}
