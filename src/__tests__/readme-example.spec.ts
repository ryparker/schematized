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

test('Outputs basic schema (readme example 1), when provided one object.', async (t) => {
	const instance = new SchemaBuilder();

	const readmeObject1 = loadExampleObject('readme1');

	instance.addObject(readmeObject1);
	const schema = instance.toSchema();

	await saveExampleSchema(schema, 'readme1');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(schema);
	t.assert(isValidSchema);

	const validate = schemaValidator.compile(schema);
	const valid = await validate(readmeObject1);
	t.assert(
		valid,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs improved schema (readme example 2), when provided two objects.', async (t) => {
	const readmeObject1 = loadExampleObject('readme1');
	const readmeObject2 = loadExampleObject('readme2');

	const instance = new SchemaBuilder();

	instance.addObject(readmeObject1);
	instance.addObject(readmeObject2);

	const schema = instance.toSchema();

	await saveExampleSchema(schema, 'readme2');

	const schemaValidator = new AJV();
	const isValidSchema = schemaValidator.validateSchema(schema);

	t.assert(isValidSchema);

	const validate = schemaValidator.compile(schema);

	const valid1 = await validate(readmeObject1);

	t.assert(
		valid1,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);

	const valid2 = await validate(readmeObject2);

	t.assert(
		valid2,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});

test('Outputs improved schema (readme example 3), when provided two objects and one schema.', async (t) => {
	const readmeObject1 = loadExampleObject('readme1');
	const readmeObject2 = loadExampleObject('readme2');

	const instance = new SchemaBuilder();

	instance.addObject(readmeObject1);
	instance.addObject(readmeObject2);
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

	const valid1 = await validate(readmeObject1);

	t.assert(
		valid1,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);

	const valid2 = await validate(readmeObject2);

	t.assert(
		valid2,
		validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
	);
});
