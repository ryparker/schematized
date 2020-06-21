export class AdditionalProperties {
	public keywords = new Set(['additionalProperties']);
	public additionalProperties: boolean | Record<string, any> = false;

	public addSchema(schema: Record<string, any>) {
		if (schema.additionalProperties) {
			this.additionalProperties = schema.additionalProperties;
		}
	}

	public toSchema() {
		return {additionalProperties: this.additionalProperties};
	}
}
