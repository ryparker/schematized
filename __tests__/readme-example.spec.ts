import AJV from 'ajv';
import SchemaBuilder from '../src';
import fs from 'fs';
import path from 'path';
import test from 'ava';

async function saveExampleSchema(object: Record<string, any>, name: string) {
	await fs.promises.writeFile(
		path.resolve(__dirname, `../examples/schemas/${name}.json`),
		JSON.stringify(object, null, 2)
	);
}

test('Outputs basic schema (readme example 1), when provided one object.', async (t) => {
	const instance = new SchemaBuilder();

	const samplePayload = require('../examples/readme1.json');

	instance.addObject(samplePayload);
	const schema = instance.toSchema();

	await saveExampleSchema(schema, 'readme1');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(schema);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(schema);
	const valid = await validate(samplePayload);
	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs improved schema (readme example 2), when provided two objects.', async (t) => {
	const instance = new SchemaBuilder();

	const samplePayload1 = require('../examples/readme1.json');
	const samplePayload2 = require('../examples/readme2.json');

	instance.addObject(samplePayload1);
	instance.addObject(samplePayload2);

	const schema = instance.toSchema();

	await saveExampleSchema(schema, 'readme2');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(schema);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(schema);
	const valid = await validate(samplePayload1);
	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs improved schema (readme example 3), when provided two objects and one schema.', async (t) => {
	const instance = new SchemaBuilder();

	const samplePayload1 = require('../examples/readme1.json');
	const samplePayload2 = require('../examples/readme2.json');

	instance.addObject(samplePayload1);
	instance.addObject(samplePayload2);
	instance.addSchema({
		title: '/user server response',
		description: '/user server response'
	});

	const schema = instance.toSchema();

	await saveExampleSchema(schema, 'readme3');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(schema);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(schema);
	const valid = await validate(samplePayload1);
	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});
