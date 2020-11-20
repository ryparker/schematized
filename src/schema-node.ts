import {BASIC_SCHEMA_STRATEGIES, TypelessStrategy} from './strategies';

import _ from 'lodash';

export class SchemaNode {
	public activeStrategies = [];
	public strategies = BASIC_SCHEMA_STRATEGIES;

	public addSchema(schema: Record<string, any>) {
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

		if (types.size > 0) {
			const schemaType =
				types.size === 1 ? _.last([...types]) : _.orderBy([...types]);

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
						TypelessStrategy
				) {
					const typeless = this.activeStrategies.pop();
					activeStrategy.addSchema(typeless.toSchema());
				}

				this.activeStrategies.push(activeStrategy);
				return activeStrategy;
			}
		}

		// No match found, if typeless add to first strategy
		const typelessInstance = new TypelessStrategy(schemaNode);

		if (kind === 'schema' && typelessInstance.matchSchema(schemaOrObject)) {
			if (this.activeStrategies.length === 0) {
				this.activeStrategies.push(typelessInstance);
			}

			return this.activeStrategies[0];
		}

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

			for (const anyOf of schema.anyOf) {
				for (const subSchema of this.getSubSchemas(anyOf)) {
					subSchemas.add(subSchema);
				}
			}

			return [...subSchemas];
		}

		if (schema.type && Array.isArray(schema.type)) {
			return schema.type.map((type) => ({...schema, type}));
		}

		return [schema];
	}
}
