import {SchemaNode} from '../schema-node';
import _ from 'lodash';

export abstract class SchemaStrategy {
	keywords = new Set(['type']);
	nodeClass: SchemaNode;
	extraKeywords: any;
	public type: string;

	constructor(schemaNode) {
		this.nodeClass = schemaNode;
		this.extraKeywords = {};
	}

	public matchObject(_object: any) {
		throw new Error('matchObject not implemented');
	}

	public matchSchema(_schema: Record<string, unknown>) {
		throw new Error('matchSchema not implemented');
	}

	public addObject(_object: any) {
		// Do nothing, this should be overriden.
	}

	public addSchema(schema: Record<string, unknown>) {
		this.addExtraKeywords(schema);
	}

	public toSchema() {
		return {...this.extraKeywords};
	}

	private addExtraKeywords(schema: any) {
		for (const [key, value] of _.toPairs(schema)) {
			if (!this.keywords.has(key)) {
				if (!this.extraKeywords[key]) {
					this.extraKeywords[key] = value;
				} else if (this.extraKeywords[key] !== value) {
					console.warn('Schema incompatible.');
				}
			}
		}
	}
}
