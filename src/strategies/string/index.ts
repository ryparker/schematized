import {Format} from './format';
import {MaxLength} from './max-length';
import {MinLength} from './min-length';
import {TypedSchemaStrategy} from '../typed-schema-strategy';
import _ from 'lodash';

export class StringStrategy extends TypedSchemaStrategy {
	public type = 'string';
	public maxLengthStrategy: MaxLength;
	public minLengthStrategy: MinLength;
	public formatStrategy: Format;

	constructor(schemaNode) {
		super(schemaNode);
		this.maxLengthStrategy = new MaxLength();
		this.minLengthStrategy = new MinLength();
		this.formatStrategy = new Format();
	}

	public matchObject(object: any) {
		return _.isString(object);
	}

	public addObject(string: string) {
		super.addObject(string);
		this.maxLengthStrategy.addObject(string);
		this.minLengthStrategy.addObject(string);
		this.formatStrategy.addObject(string);
	}

	public addSchema(schema: Record<string, unknown>) {
		super.addSchema(schema);
		this.maxLengthStrategy.addSchema(schema);
		this.minLengthStrategy.addSchema(schema);
		this.formatStrategy.addSchema(schema);
	}

	public toSchema() {
		let schema = super.toSchema();
		schema = {...schema, ...this.maxLengthStrategy.toSchema()};
		schema = {...schema, ...this.minLengthStrategy.toSchema()};
		schema = {...schema, ...this.formatStrategy.toSchema()};

		return schema;
	}
}
