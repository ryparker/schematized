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
		if (_.isNil(schema.minLength)) {
			return;
		}

		if (_.isNil(this.minLength)) {
			this.minLength = schema.minLength;
			return;
		}

		this.minLength = Math.min(this.minLength, schema.minLength);
	}

	public toSchema() {
		if (!_.isNumber(this.minLength)) {
			return {};
		}

		return {minLength: Math.round(this.minLength)};
	}
}
