import _ from 'lodash';

export class Format {
	public keywords = new Set(['format']);
	public format: string | null = null;

	public addObject(string: string) {
		this.format = _.isNil(this.format)
			? Object.keys(formats).find((f) => formats[f].test(string))
			: this.format;
	}

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(this.format)) {
			this.format = _.get(schema, 'format');
		} else if (schema.format) {
			this.format = schema.format;
		}
	}

	public toSchema(): Record<string, unknown> {
		if (!this.format) return undefined;

		return {format: this.format};
	}
}

// https://github.com/ajv-validator/ajv/blob/master/lib/compile/formats.js
const formats = {
	date: /^\d{4}-[01]\d-[0-3]\d$/,
	time: /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i,
	'date-time': /^\d{4}-[01]\d-[0-3]\d[t\s](?:[0-2](?:\d:[0-5]){2}\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d{2}(?::?\d{2})?)$/i,
	uri: /^[a-z][a-z\d+-.]*:(?:\/?\/)?\S*$/i,
	url: /(https?:\/\/(?:www\.|(?!www))[a-z\d][a-z\d-]+[a-z\d]\.\S{2,}|www\.[a-z\d][a-z\d-]+[a-z\d]\.\S{2,}|https?:\/\/(?:www\.|(?!www))[a-z\d]+\.\S{2,}|www\.[a-z\d]+\.\S{2,})/,
	email: /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i,
	ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	ipv6: /^\s*(?:(?:(?:[\da-f]{1,4}:){7}(?:[\da-f]{1,4}|:))|(?:(?:[\da-f]{1,4}:){6}(?::[\da-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[\da-f]{1,4}:){5}(?:(?::[\da-f]{1,4}){1,2}|:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}|:))|(?:(?:[\da-f]{1,4}:){4}(?:(?::[\da-f]{1,4}){1,3}|(?:(?::[\da-f]{1,4})?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[\da-f]{1,4}:){3}(?:(?::[\da-f]{1,4}){1,4}|(?:(?::[\da-f]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[\da-f]{1,4}:){2}(?:(?::[\da-f]{1,4}){1,5}|(?:(?::[\da-f]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:[\da-f]{1,4}:(?:(?::[\da-f]{1,4}){1,6}|(?:(?::[\da-f]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?::(?:(?::[\da-f]{1,4}){1,7}|(?:(?::[\da-f]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)))(?:%.+)?\s*$/i,
	uuid: /^(?:urn:uuid:)?[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i
};
