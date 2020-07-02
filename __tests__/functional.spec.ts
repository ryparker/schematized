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

test('Outputs profile JSON schema, when provided one JSON payload.', async (t) => {
	const instance = new SchemaBuilder();

	const samplePayload = require('../examples/profile.json');

	instance.addObject(samplePayload);
	const output = instance.toSchema();

	await saveExampleSchema(output, 'profile');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(output);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(output);
	const valid = await validate(samplePayload);
	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs /gettoken JSON schema, when provided one JSON payload.', async (t) => {
	const instance = new SchemaBuilder();

	const samplePayload = require('../examples/auth.json');

	instance.addObject(samplePayload);
	const output = instance.toSchema();

	await saveExampleSchema(output, 'auth');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(output);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(output);
	const valid = await validate(samplePayload);
	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs /documents(cvi) JSON schema, when provided one JSON payload.', async (t) => {
	const instance = new SchemaBuilder();

	const samplePayload = require('../examples/document.json');

	instance.addObject(samplePayload);
	const output = instance.toSchema();

	await saveExampleSchema(output, 'document');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(output);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(output);
	const valid = await validate(samplePayload);
	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs /user JSON schema, when provided one JSON payload.', async (t) => {
	const instance = new SchemaBuilder();

	const samplePayload = require('../examples/user.json');

	instance.addObject(samplePayload);
	const output = instance.toSchema();

	await saveExampleSchema(output, 'user');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(output);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(output);
	const valid = await validate(samplePayload);
	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs JSON schema, when provided two JSON payload and one schema.', async (t) => {
	const instance = new SchemaBuilder();

	const samplePayload = require('../examples/user.json');
	const samplePayload2 = require('../examples/user2.json');

	instance.addObject(samplePayload);
	instance.addObject(samplePayload2);
	instance.addSchema({
		title: '/user response',
		description: 'User data from server.'
	});

	const output = instance.toSchema();

	await saveExampleSchema(output, 'user1&2');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(output);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(output);
	const valid = await validate(samplePayload);

	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);

	const valid2 = await validate(samplePayload2);

	t.assert(
		valid2,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});
