import _ from 'lodash';

export class Required {
	public keywords = new Set(['required']);
	public required: Set<string> | null = null;

	public addObject(object: Record<string, any>) {
		const properties = new Set(Object.keys(object));
		if (_.isNil(this.required)) {
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
			const required: Set<string> = new Set(schema.required);

			if (_.isNil(this.required)) {
				this.required = required;
			} else {
				const newRequirements = _.intersection(
					[...required],
					[...this.required]
				);

				this.required = new Set(newRequirements);
			}
		}
	}

	public toSchema() {
		if (!this.required) return undefined;

		return {required: _.orderBy([...this.required])};
	}
}
