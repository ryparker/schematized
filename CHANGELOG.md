# Changelog

# [1.9.0](https://github.com/ryparker/schematized/compare/v1.8.9...v1.9.0) (2021-01-01)


### Features

* **schema-builder.ts:** added sorting of key on `toSchema()` ([39e964b](https://github.com/ryparker/schematized/commit/39e964b32196418eb6a0dc89b0c78c75c59eb8d8))

## [1.8.9](https://github.com/ryparker/schematized/compare/v1.8.8...v1.8.9) (2020-12-23)


### Bug Fixes

* **package.json, yarn.lock:** bumped deps and locked AJV version to v6 ([cf7db91](https://github.com/ryparker/schematized/commit/cf7db916db26d03d9bb02d1bd8b0efa622bd0165))

## [1.8.8](https://github.com/ryparker/schematized/compare/v1.8.7...v1.8.8) (2020-11-20)


### Bug Fixes

* **package.json:** resolved to "mem": "^4.0", ([4be8699](https://github.com/ryparker/schematized/commit/4be8699f8193836b686222c67cea7fd6688aa551))
* **yarn.lock:** updated yarn lock ([d6e45c0](https://github.com/ryparker/schematized/commit/d6e45c06d5040084700c62a5c1f1d3b2c55ef330))

## [1.8.7](https://github.com/ryparker/schematized/compare/v1.8.6...v1.8.7) (2020-11-20)


### Bug Fixes

* **package.json:** upgraded yarn deps ([520d124](https://github.com/ryparker/schematized/commit/520d124b7f0d94da3bc5cea7278625b2b1a35f60))

## [1.8.6](https://github.com/ryparker/schematized/compare/v1.8.5...v1.8.6) (2020-11-20)


### Bug Fixes

* **commitizen:** added commitizen config ([543f61b](https://github.com/ryparker/schematized/commit/543f61b786c032be68ef10541b33dbe69c50757e))
* **package.json:** added conventional-changelog-conventionalcommits ([bbb161e](https://github.com/ryparker/schematized/commit/bbb161edc79bbd00f1a1b21912334e21ea01f62c))
* **package.json:** upgraded deps ([f5dd8c0](https://github.com/ryparker/schematized/commit/f5dd8c0deffb4cc1b2441af92d192f29647c036f))
* **package.json, .github/*:** fixed semantic-release config for main branch ([5cb9554](https://github.com/ryparker/schematized/commit/5cb9554c1f7d1bbe4e5464e0c8eed8c901e34dcc))
* **schema-node.ts:** fix XO linter errors ([00e876b](https://github.com/ryparker/schematized/commit/00e876b0b041ed029feb0e7c8d34a780f9c29a96))

## [1.8.5](https://github.com/ryparker/schematized/compare/v1.8.4...v1.8.5) (2020-08-13)


### Bug Fixes

* **max/min limits:** min/max were inaccurate if unset or 0 ([caa0fe6](https://github.com/ryparker/schematized/commit/caa0fe6d84f3e19cb248b8cc39fa612ed9ab4975))



## [1.8.4](https://github.com/ryparker/schematized/compare/v1.8.5...v1.8.4) (2020-11-20)


### Bug Fixes

* **package.json:** upgraded deps ([f5dd8c0](https://github.com/ryparker/schematized/commit/f5dd8c0deffb4cc1b2441af92d192f29647c036f))
* **package.json, .github/*:** fixed semantic-release config for main branch ([5cb9554](https://github.com/ryparker/schematized/commit/5cb9554c1f7d1bbe4e5464e0c8eed8c901e34dcc))
* **schema-node.ts:** fix XO linter errors ([00e876b](https://github.com/ryparker/schematized/commit/00e876b0b041ed029feb0e7c8d34a780f9c29a96))


## [1.8.3](https://github.com/ryparker/schematized/compare/v1.8.2...v1.8.3) (2020-08-12)


### Bug Fixes

* **strategies/*:** null strategy values will be ignored ([dd3d6d8](https://github.com/ryparker/schematized/commit/dd3d6d8a42fcd852aab30a4f6be921fc4173d578))



## [1.8.2](https://github.com/ryparker/schematized/compare/v1.8.1...v1.8.2) (2020-08-12)


### Bug Fixes

* **array and string strategies:** fix for empty arrays being schematized as "items:undefined" ([4233772](https://github.com/ryparker/schematized/commit/423377238004ca764bc8b83d17e500948561c17c))



## [1.8.1](https://github.com/ryparker/schematized/compare/v1.8.0...v1.8.1) (2020-08-12)


### Performance Improvements

* **removed unnecessary toschema() declarations:** also bumped deps ([df9e42c](https://github.com/ryparker/schematized/commit/df9e42cad39bc95c3cbe175a34a6e35245cf351e))



# [1.8.0](https://github.com/ryparker/schematized/compare/v1.7.2...v1.8.0) (2020-08-07)


### Features

* **object strategy:** added support for disabling min/maxProperties on the object strategy ([0b07b2c](https://github.com/ryparker/schematized/commit/0b07b2c2b5bca90a35662822bead48dc954e1ad0))



## [1.7.2](https://github.com/ryparker/schematized/compare/v1.7.1...v1.7.2) (2020-08-06)


### Bug Fixes

* **object max/minproperties:** if max/minProperties is null then ignore ([702b088](https://github.com/ryparker/schematized/commit/702b0889d4fbff1109d58cb8c092ea7b8a76d818))



## [1.7.1](https://github.com/ryparker/schematized/compare/v1.7.0...v1.7.1) (2020-07-13)


### Bug Fixes

* **array/index.ts:** removed console logs ([3571ab8](https://github.com/ryparker/schematized/commit/3571ab870f18926568982538bada06a286653cd6))
* **yarn.lock:** updated lock file ([3c40fdf](https://github.com/ryparker/schematized/commit/3c40fdfa737c082371fc2d854b3d69977e667584))



# [1.7.0](https://github.com/ryparker/schematized/compare/v1.6.0...v1.7.0) (2020-07-02)


### Bug Fixes

* **strategies/object:** fixed a bug where required would not update if it was non-null and empty ([4b3f266](https://github.com/ryparker/schematized/commit/4b3f266ffc64b5292387f25db28d5e0390fe0034))


### Features

* **index.ts:** now supports LTS node env (ES2019) ([adf7fc3](https://github.com/ryparker/schematized/commit/adf7fc346dea01bd5d263d32bca59646dbbed677))
* **object and string strategies:** added support for disabled, min/max props, and prop patterns ([69247c4](https://github.com/ryparker/schematized/commit/69247c44c2a047bf154285c5d4e58f6b623190ea))



## [1.5.1](https://github.com/ryparker/schematized/compare/v1.5.0...v1.5.1) (2020-06-22)


### Bug Fixes

* **object:** fixed an issue when adding schema with object ([f622ca9](https://github.com/ryparker/schematized/commit/f622ca91b889d6c6fbb7a7701fc5819650b38b6f))



# [1.5.0](https://github.com/ryparker/schematized/compare/v1.4.0...v1.5.0) (2020-06-21)


### Features

* **readme and strategies:** decoupled strategies from constraints. README Added supported features ([5b6fdae](https://github.com/ryparker/schematized/commit/5b6fdae3bbf538324010647887da177da78cf087))



# [1.4.0](https://github.com/ryparker/schematized/compare/v1.3.0...v1.4.0) (2020-06-21)


### Features

* **schema-node.ts:** added support for typeless schema props ([7095d11](https://github.com/ryparker/schematized/commit/7095d1146d2be68e1dcdc4f7a3323cf1c9d4ca08))



# [1.3.0](https://github.com/ryparker/schematized/compare/v1.2.0...v1.3.0) (2020-06-21)


### Features

* **removed duplicate step in ci:** removed Build step in CI since Test step already does a build ([90712ed](https://github.com/ryparker/schematized/commit/90712ed2de31e41e497b0f8e48c3905f4a2fcf67))



# [1.2.0](https://github.com/ryparker/schematized/compare/v1.0.3...v1.2.0) (2020-06-21)


### Features

* **formats:** replaced control characters in url regex ([dec30a0](https://github.com/ryparker/schematized/commit/dec30a0cc24c22ddabcd966175f9c21a0764960d))
* **formats, array items, and requirement intersections:** fixes, improvements, extensions ([0060f37](https://github.com/ryparker/schematized/commit/0060f372c8b3d2881c278774a47c2a3dd822de97))



## [1.0.3](https://github.com/ryparker/schematized/compare/v1.1.0...v1.0.3) (2020-06-20)



# [1.1.0](https://github.com/ryparker/schematized/compare/v1.0.1...v1.1.0) (2020-06-18)


### Features

* **ci:** setup Github workflows with NPM registry ([47e9101](https://github.com/ryparker/schematized/commit/47e910188c36f0c100decfe148c8f5ec8b01b866))



## [1.0.1](https://github.com/ryparker/schematized/compare/v1.0.0...v1.0.1) (2020-06-18)



# [1.0.0](https://github.com/ryparker/schematized/compare/bbe72c0af5b95cb23675cac51e9d0b60cddd3941...v1.0.0) (2020-06-18)


### Features

* **ci:** setup CI process that uses semantic-release and commitizen to auto publish the npm package ([bbe72c0](https://github.com/ryparker/schematized/commit/bbe72c0af5b95cb23675cac51e9d0b60cddd3941))
