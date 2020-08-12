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
		if (schema.minLength) {
			this.minLength = Math.min(this.minLength, schema.minLength);
		}
	}

	public toSchema() {
		if (!this.minLength) return undefined;

		return {minLength: Math.round(this.minLength)};
	}
}
