import _ from 'lodash';

export class Format {
	public keywords = new Set(['format']);
	public format: string | null = null;

	public addSchema(schema: Record<string, any>) {
		if (_.isNil(this.format)) {
			this.format = _.get(schema, 'format');
		} else if (schema.format) {
			this.format = schema.format;
		}
	}

	public addObject(string: string) {
		this.format = _.isNil(this.format)
			? Object.keys(formats).find((f) => formats[f].test(string))
			: this.format;
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
	url: /^(?:http[s\u017F]?|ftp):\/\/(?:(?:[\0-\u0008\u000E-\u001F!-\u009F\u00A1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?::(?:[\0-\u0008\u000E-\u001F!-\u009F\u00A1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:(?:[\dksa-z\u00A1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[\dksa-z\u00A1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+(?:\.(?:(?:[\dksa-z\u00A1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+-?)*(?:[\dksa-z\u00A1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+)*\.(?:[ksa-z\u00A1-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]){2,})(?::\d{2,5})?(?:\/(?:[\0-\u0008\u000E-\u001F!-\u009F\u00A1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)?$/i,
	email: /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i,
	ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
	ipv6: /^\s*(?:(?:(?:[\da-f]{1,4}:){7}(?:[\da-f]{1,4}|:))|(?:(?:[\da-f]{1,4}:){6}(?::[\da-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[\da-f]{1,4}:){5}(?:(?::[\da-f]{1,4}){1,2}|:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}|:))|(?:(?:[\da-f]{1,4}:){4}(?:(?::[\da-f]{1,4}){1,3}|(?:(?::[\da-f]{1,4})?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[\da-f]{1,4}:){3}(?:(?::[\da-f]{1,4}){1,4}|(?:(?::[\da-f]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:(?:[\da-f]{1,4}:){2}(?:(?::[\da-f]{1,4}){1,5}|(?:(?::[\da-f]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?:[\da-f]{1,4}:(?:(?::[\da-f]{1,4}){1,6}|(?:(?::[\da-f]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(?::(?:(?::[\da-f]{1,4}){1,7}|(?:(?::[\da-f]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:)))(?:%.+)?\s*$/i,
	uuid: /^(?:urn:uuid:)?[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i
};
