# Schematized

[![NPM](https://nodei.co/npm/schematized.png)](https://npmjs.org/package/schematized)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Build-Test-Publish](https://github.com/ryparker/JSON-Schema-Builder/workflows/Build-Test-Publish/badge.svg)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Turn JS objects into JSON schemas that continue to improve as you provide examples.

A Node port of the Python module Genson.

## :rocket: Quickstart

1. Add dependency

```shell
yarn add schematized
```

2. Basic usage

```ts
import { SchemaBuilder } from 'schematized' // Typescript & ES6+
const { default: SchemaBuilder } = require('schematized') // CommonJS

const builder = new SchemaBuilder()

// Consume JSON
builder.addObject({
  token: '74aea1a53d68b77e4f1f55fa90a7eb81',
  role: ['Basic'],
})

// Produce JSON Schemas!
const schema = builder.toSchema()
```

3. Improve the schema

```ts
...

// Add more example objects
builder.addObject({
  token: 'Bearer 6498d9afc96d1d8d881a2b7ded4f9290',
  role: [
    'Admin',
    'Basic',
    'Publisher'
  ]
})

// Or combine data from another JSON Schema
builder.addSchema({
  title: '/user response',
  description: 'User data from server.'
})
```

**Schema from the single example:**

```JSON
{
  "$schema": "http://json-schema.org/schema#",
  "type": "object",
  "properties": {
    "token": {
      "type": "string",
      "maxLength": 32,
      "minLength": 32
    },
    "role": {
      "type": "array",
      "items": {
        "type": "string",
        "maxLength": 5,
        "minLength": 5
      }
    }
  },
  "required": [
    "role",
    "token"
  ]
}
```

**Schema from the two examples:**

```JSON
{
  "$schema": "http://json-schema.org/schema#",
  "type": "object",
  "properties": {
    "token": {
      "type": "string",
      "maxLength": 39,
      "minLength": 32
    },
    "role": {
      "type": "array",
      "items": {
        "type": "string",
        "maxLength": 9,
        "minLength": 5
      }
    }
  },
  "required": [
    "role",
    "token"
  ]
}
```

**Schema from the two examples and the schema**:

```JSON
{
  "$schema": "http://json-schema.org/schema#",
  "title": "/user response",
  "description": "User data from server.",
  "type": "object",
  "properties": {
    "token": {
      "type": "string",
      "maxLength": 39,
      "minLength": 32
    },
    "role": {
      "type": "array",
      "items": {
        "type": "string",
        "maxLength": 9,
        "minLength": 5
      }
    }
  },
  "required": [
    "role",
    "token"
  ]
}
```
