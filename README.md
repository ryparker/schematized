# Schematized

[![NPM](https://nodei.co/npm/schematized.png)](https://npmjs.org/package/schematized)

![Build-Test-Publish](https://github.com/ryparker/JSON-Schema-Builder/workflows/Build-Test-Publish/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Turn objects into JSON schemas! The more examples you provide, the better your schema will be.

A Node port of the Python module Genson.

---

- [Schematized](#schematized)
  - [:rocket: Quickstart](#-quickstart)
    - [Schema from the single example](#schema-from-the-single-example)
    - [Schema from the two examples](#schema-from-the-two-examples)
    - [Schema from the two examples and the schema](#schema-from-the-two-examples-and-the-schema)
  - [📖 API](#-api)
  - [✅ Supported Schema Features](#-supported-schema-features)
    - [Types](#types)
    - [Typeless](#typeless)
    - [String](#string)
      - [Supported String formats](#supported-string-formats)
    - [Number](#number)
    - [Object](#object)
    - [Array](#array)

---

## :rocket: Quickstart

1. **Add dependency**

```shell
yarn add schematized
```

2. **Basic usage** : [See output](#schema-from-the-single-example)

```ts
import { SchemaBuilder } from 'schematized' // Typescript & ES6+
const { SchemaBuilder } = require('schematized') // CommonJS

const builder = new SchemaBuilder()

// Consume JSON
builder.addObject({
  token: '74aea1a53d68b77e4f1f55fa90a7eb81',
  role: ['Basic'],
})

// Produce JSON Schemas!
const schema = builder.toPrettySchema()
```

3. **Improve the schema with examples** : [See output](#schema-from-the-two-examples)

```ts
...

builder.addObject({
  token: 'Bearer 6498d9afc96d1d8d881a2b7ded4f9290',
  role: [
    'Admin',
    'Basic',
    'Publisher'
  ]
})
```

4. **Improve the schema with existing schemas** : [See output](#schema-from-the-two-examples-and-the-schema)

```ts
...

builder.addSchema({
  title: '/user response',
  description: 'User data from server.'
})
```

---

### Schema from the single example

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

### Schema from the two examples

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

### Schema from the two examples and the schema

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

---

## 📖 API

| Method                | Definition                                      | Parameter         |
| --------------------- | ----------------------------------------------- | ----------------- |
| `.addObject($object)` | Add an example to improve the generated schema. | Valid JSON object |
| `.addSchema($schema)` | Add schemas to improve the generated schema.    | Valid JSON Schema |
| `.toSchema()`         | Generate the schema.                            | None              |
| `.toPrettySchema()`   | Generate the schema and pretty print.           | None              |

## ✅ Supported Schema Features

Visit the [official JSON Schema site](https://json-schema.org/understanding-json-schema/reference/index.html) for specification details.

### Types

| Type    | Supported |
| ------- | --------- |
| String  | Yes       |
| Number  | Yes       |
| Integer | Never     |
| Object  | Yes       |
| Array   | Yes       |
| Tuple   | Not yet   |
| Boolean | Yes       |
| Null    | Yes       |

### Typeless

| Constraint   | addSchema() | addObject() |
| ------------ | ----------- | ----------- |
| title        | Yes         | Never       |
| description  | Yes         | Never       |
| \$comment    | Yes         | Never       |
| default      | Not yet     | Not yet     |
| examples     | Not yet     | Not yet     |
| enum         | Not yet     | Not yet     |
| const        | Not yet     | Not yet     |
| anyOf        | Yes         | Yes         |
| allOf        | Not yet     | Not yet     |
| oneOf        | Not yet     | Not yet     |
| not          | Not yet     | Not yet     |
| if/then/else | Not yet     | Not yet     |

### String

| Constraint       | addSchema() | addObject() |
| ---------------- | ----------- | ----------- |
| maxLength        | Yes         | Yes         |
| minLength        | Yes         | Yes         |
| format           | Yes         | Yes         |
| pattern          | Not yet     | Not yet     |
| contentMediaType | Not yet     | Not yet     |
| contentEncoding  | Not yet     | Not yet     |

#### Supported String formats

| Format                | Supported? |
| --------------------- | ---------- |
| date-time             | Yes        |
| date                  | Yes        |
| time                  | Yes        |
| email                 | Yes        |
| hostname              | Not yet    |
| idn-hostname          | Not yet    |
| ipv4                  | Yes        |
| ipv6                  | Yes        |
| uri                   | Yes        |
| uri-reference         | Not yet    |
| url                   | Yes        |
| uuid                  | Yes        |
| iri                   | Not yet    |
| iri-reference         | Not yet    |
| uri-template          | Not yet    |
| json-pointer          | Not yet    |
| relative-json-pointer | Not yet    |
| regex                 | Not yet    |

### Number

| Constraint       | addSchema() | addObject() |
| ---------------- | ----------- | ----------- |
| maximum          | Yes         | Yes         |
| minimum          | Yes         | Yes         |
| exclusiveMaximum | Not yet     | Not yet     |
| exclusiveMinimum | Not yet     | Not yet     |
| multiple         | Not yet     | Not yet     |

### Object

| Constraint           | addSchema() | addObject() |
| -------------------- | ----------- | ----------- |
| propertyPatterns     | Yes         | Yes         |
| additionalProperties | Yes         | Yes         |
| required             | Yes         | Yes         |
| maxProperties        | Not yet     | Not yet     |
| minProperties        | Not yet     | Not yet     |

### Array

| Constraint  | addSchema() | addObject() |
| ----------- | ----------- | ----------- |
| maxItems    | Not yet     | Not yet     |
| minItems    | Not yet     | Not yet     |
| uniqueItems | Not yet     | Not yet     |
