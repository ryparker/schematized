import _ from 'lodash';

export class MaxLength {
	public keywords = new Set(['maxLength']);
	public maxLength: number | null = null;

	public addObject(string: string) {
		this.maxLength = _.isNil(this.maxLength)
			? string.length
			: Math.max(this.maxLength, string.length);
	}

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(schema.maxLength)) {
			return;
		}

		if (_.isNil(this.maxLength)) {
			this.maxLength = schema.maxLength;
			return;
		}

		this.maxLength = Math.max(this.maxLength, schema.maxLength);
	}

	public toSchema() {
		if (!_.isNumber(this.maxLength) || this.maxLength === 0) {
			return {};
		}

		return {maxLength: Math.round(this.maxLength)};
	}
}
