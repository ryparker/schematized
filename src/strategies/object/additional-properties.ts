import _ from 'lodash';

export class AdditionalProperties {
	public keywords = new Set(['additionalProperties']);
	public additionalProperties: boolean | Record<string, any> = false;

	public addSchema(schema: Record<string, any>) {
		if (!_.isNil(schema.additionalProperties)) {
			this.additionalProperties = schema.additionalProperties;
		}
	}

	public toSchema() {
		return {additionalProperties: this.additionalProperties};
	}
}
