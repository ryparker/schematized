import AJV from 'ajv';
import SchemaBuilder from '../../dist';
import fs from 'fs';
import path from 'path';
import test from 'ava';

function loadExampleObject(name: string) {
	return require(path.resolve(
		__dirname,
		`../../examples/objects/${name}.json`
	));
}

async function saveExampleSchema(object: Record<string, any>, name: string) {
	await fs.promises.writeFile(
		path.resolve(__dirname, `../../examples/schemas/${name}.json`),
		JSON.stringify(object, null, 2)
	);
}

test('Outputs profile JSON schema, when provided one JSON payload.', async (t) => {
	const samplePayload = loadExampleObject('profile');

	const instance = new SchemaBuilder();

	instance.addObject(samplePayload);

	const schema = instance.toSchema();

	await saveExampleSchema(schema, 'profile');

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

test('Outputs /gettoken JSON schema, when provided one JSON payload.', async (t) => {
	const samplePayload = loadExampleObject('auth');

	const instance = new SchemaBuilder();

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
	const samplePayload = loadExampleObject('document');

	const instance = new SchemaBuilder();

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
	const accountInfoObject1 = loadExampleObject('account-info');

	const instance = new SchemaBuilder();

	instance.addObject(accountInfoObject1);

	const output = instance.toSchema();

	await saveExampleSchema(output, 'user');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(output);

	t.assert(isValidSchema);

	const validate = schemaValidator.compile(output);

	const valid = await validate(accountInfoObject1);

	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs JSON schema, when provided two JSON payload and one schema.', async (t) => {
	const accountInfoObject1 = loadExampleObject('account-info');
	const accountInfoObject2 = loadExampleObject('account-info2');

	const instance = new SchemaBuilder();

	instance.addObject(accountInfoObject1);
	instance.addObject(accountInfoObject2);
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

	const valid = await validate(accountInfoObject1);

	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);

	const valid2 = await validate(accountInfoObject2);

	t.assert(
		valid2,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});
