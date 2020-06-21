import _ from 'lodash';

export class MinLength {
	public keywords = new Set(['minLength']);
	public minLength: number | null = null;

	public addObject(string: string) {
		this.minLength = _.isNil(this.minLength)
			? string.length
			: Math.min(this.minLength, string.length);
	}

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(this.minLength)) {
			this.minLength = _.get(schema, 'minLength');
		} else if (schema.minLength) {
			this.minLength = Math.min(this.minLength, schema.minLength);
		}
	}

	public toSchema() {
		return {minLength: Math.round(this.minLength)};
	}
}
