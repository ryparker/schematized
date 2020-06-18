import AJV from 'ajv'
import { SchemaBuilder } from './index'
import test from 'ava'

test('Outputs profile JSON schema, when provided one JSON payload.', async (t) => {
  const instance = new SchemaBuilder()

  const samplePayload = require('../examples/profile.json')

  instance.addObject(samplePayload)
  const output = instance.toSchema()
  console.log('OUTPUT: ', JSON.stringify(output, null, 2))

  const schemaValidator = new AJV()
  const isValidSchema = schemaValidator.validateSchema(output)
  t.assert(isValidSchema)

  const validate = schemaValidator.compile(output)
  const valid = await validate(samplePayload)
  t.assert(
    valid,
    validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
  )
})

test('Outputs /gettoken JSON schema, when provided one JSON payload.', async (t) => {
  const instance = new SchemaBuilder()

  const samplePayload = require('../examples/auth.json')

  instance.addObject(samplePayload)
  const output = instance.toSchema()
  console.log('OUTPUT: ', JSON.stringify(output, null, 2))

  const schemaValidator = new AJV()
  const isValidSchema = schemaValidator.validateSchema(output)
  t.assert(isValidSchema)

  const validate = schemaValidator.compile(output)
  const valid = await validate(samplePayload)
  t.assert(
    valid,
    validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
  )
})

test('Outputs /documents(cvi) JSON schema, when provided one JSON payload.', async (t) => {
  const instance = new SchemaBuilder()

  const samplePayload = require('../examples/document.json')

  instance.addObject(samplePayload)
  const output = instance.toSchema()
  console.log('OUTPUT: ', JSON.stringify(output, null, 2))

  const schemaValidator = new AJV()
  const isValidSchema = schemaValidator.validateSchema(output)
  t.assert(isValidSchema)

  const validate = schemaValidator.compile(output)
  const valid = await validate(samplePayload)
  t.assert(
    valid,
    validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
  )
})

test('Outputs /user JSON schema, when provided one JSON payload.', async (t) => {
  const instance = new SchemaBuilder()

  const samplePayload = require('../examples/user.json')

  instance.addObject(samplePayload)
  const output = instance.toSchema()
  console.log('OUTPUT: ', JSON.stringify(output, null, 2))

  const schemaValidator = new AJV()
  const isValidSchema = schemaValidator.validateSchema(output)
  t.assert(isValidSchema)

  const validate = schemaValidator.compile(output)
  const valid = await validate(samplePayload)
  t.assert(
    valid,
    validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
  )
})

test('Outputs /user & /user2 JSON schema, when provided one JSON payload.', async (t) => {
  const instance = new SchemaBuilder()

  const samplePayload = require('../examples/user.json')

  instance.addObject(samplePayload)

  const samplePayload2 = require('../examples/user2.json')

  instance.addObject(samplePayload2)

  const output = instance.toSchema()
  console.log('OUTPUT: ', JSON.stringify(output, null, 2))

  const schemaValidator = new AJV()
  const isValidSchema = schemaValidator.validateSchema(output)
  t.assert(isValidSchema)

  const validate = schemaValidator.compile(output)
  const valid = await validate(samplePayload)

  t.assert(
    valid,
    validate.errors ? JSON.stringify(validate.errors, null, 2) : 'pass'
  )
})
