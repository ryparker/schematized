import _ from 'lodash';

export class Required {
	public keywords = new Set(['required']);
	public required = new Set();

	public addObject(object: Record<string, unknown>) {
		const properties = new Set(Object.keys(object));
		if (_.isNil(this.required) || this.required.size === 0) {
			this.required = properties;
		} else {
			const newRequirements = _.intersection(
				[...properties],
				[...this.required]
			);

			this.required = new Set(newRequirements);
		}
	}

	public addSchema(schema: Record<string, any>) {
		if (schema.required) {
			const required = new Set(schema.required);

			if (_.isNil(this.required)) {
				this.required = required;
			} else {
				this.required.add(required);
			}
		}
	}

	public toSchema() {
		if (!this.required) return undefined;

		return {required: _.orderBy([...this.required])};
	}
}
