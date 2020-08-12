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
		if (schema.maxLength) {
			this.maxLength = Math.max(this.maxLength, schema.maxLength);
		}
	}

	public toSchema() {
		if (!this.maxLength) return undefined;

		return {maxLength: Math.round(this.maxLength)};
	}
}
