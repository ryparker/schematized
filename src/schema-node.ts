import {BASIC_SCHEMA_STRATEGIES, Typeless} from './strategies';

import _ from 'lodash';

export class SchemaNode {
	public activeStrategies: any;
	public strategies = BASIC_SCHEMA_STRATEGIES;

	constructor() {
		this.activeStrategies = [];
	}

	public addSchema(schema: Record<string, unknown>) {
		if (schema instanceof SchemaNode) {
			schema = schema.toSchema();
		}

		for (const subSchema of this.getSubSchemas(schema)) {
			// Delegate to SchemaType object
			const activeStrategy = this.getStrategyForSchema(subSchema);
			activeStrategy.addSchema(subSchema);
		}

		// Return this for easy method chaining
		return this;
	}

	public addObject(object: Record<string, unknown>) {
		const activeStrategy = this.getStrategyForObject(object);
		activeStrategy.addObject(object);

		return this;
	}

	public toSchema() {
		const types = new Set();
		let generatedSchemas = [];

		for (const activeStrategy of this.activeStrategies) {
			const generatedSchema = activeStrategy.toSchema();

			if (generatedSchema.length === 1 && generatedSchema.type) {
				types.add(generatedSchema.type);
			} else {
				generatedSchemas.push(generatedSchema);
			}
		}

		if (_.size(types) > 0) {
			let schemaType;

			if (types.size === 1) {
				schemaType = _.last([...types]);
			} else {
				schemaType = _.orderBy([...types]);
			}

			generatedSchemas = [{type: schemaType}, ...generatedSchemas];
		}

		let resultSchema;

		if (generatedSchemas.length === 1) {
			resultSchema = generatedSchemas[0];
		} else if (_.isEmpty(generatedSchemas)) {
			return;
		} else {
			resultSchema = {anyOf: generatedSchemas};
		}

		return resultSchema;
	}

	private getStrategyForObject(object: Record<string, unknown>) {
		return this.getStrategyFor('object', object);
	}

	private getStrategyForSchema(schema: Record<string, unknown>) {
		return this.getStrategyFor('schema', schema);
	}

	private getStrategyFor(
		kind: 'object' | 'schema',
		schemaOrObject: Record<string, unknown>
	) {
		const method = 'match' + _.capitalize(kind);

		for (const activeStrategy of this.activeStrategies) {
			const isMatch = _.invoke(activeStrategy, method, schemaOrObject);

			if (isMatch) {
				return activeStrategy;
			}
		}

		const schemaNode = new SchemaNode();

		// Check all potential types
		for (const Strategy of this.strategies) {
			const strategyInstance = new Strategy(schemaNode);

			const isMatch = _.invoke(strategyInstance, method, schemaOrObject);

			if (isMatch) {
				const activeStrategy = strategyInstance;

				// Incorporate typeless strategy if it exists
				if (
					this.activeStrategies &&
					this.activeStrategies[this.activeStrategies.length - 1] instanceof
						Typeless
				) {
					const typeless = this.activeStrategies.pop();
					activeStrategy.addSchema(typeless.toSchema());
				}

				this.activeStrategies.push(activeStrategy);
				return activeStrategy;
			}
		}

		// No match found, if typeless add to first strategy
		const typelessInstance = new Typeless(schemaNode);
		if (kind === 'schema' && typelessInstance.matchSchema(schemaOrObject)) {
			if (this.activeStrategies.length === 0) {
				this.activeStrategies.push(typelessInstance);
			}

			const activeStrategy = this.activeStrategies[0];
			return activeStrategy;
		}

		// If no match found, raise an error
		throw new Error(
			`Could not find matching schema type for ${kind}: ${JSON.stringify(
				schemaOrObject,
				null,
				2
			)}`
		);
	}

	private getSubSchemas(schema: Record<string, any>): any {
		if (schema.anyOf) {
			const subSchemas = new Set();
			for (const anyof of schema.anyOf) {
				for (const subSchema of this.getSubSchemas(anyof)) {
					subSchemas.add(subSchema);
				}
			}

			return [...subSchemas];
		}

		if (_.isArray(_.get(schema, 'type'))) {
			const otherKeys = {...schema};
			delete otherKeys.type;

			const types = [];
			for (const t of schema.type) {
				types.push({type: t, ...otherKeys});
			}

			return types;
		}

		return [schema];
	}
}
