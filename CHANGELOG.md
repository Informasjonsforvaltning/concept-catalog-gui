# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/Informasjonsforvaltning/begrepskatalog/compare/v1.1.2...v1.2.0) (2019-10-01)


### Bug Fixes

* add fdk-theme class and upgrade designsystemet to v1.4.23 ([691df9b](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/691df9b))


### Features

* [#2034](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2034) change breadcrumb text and update design to v1.4.24 ([4573bf6](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/4573bf6))

### [1.1.2](https://github.com/Informasjonsforvaltning/begrepskatalog/compare/v1.1.1...v1.1.2) (2019-09-20)

### [1.1.1](https://github.com/Informasjonsforvaltning/begrepskatalog/compare/v1.1.0...v1.1.1) (2019-09-20)


### Bug Fixes

* Added an empty kilde as default. ([09bdcc9](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/09bdcc9))
* Added nullable to anbefaltTerm and definisjon to remove validation error on init. ([fd3bd8c](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/fd3bd8c))
* Added webpack.hostdev.config.js to .eslintignore ([2a89f7e](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/2a89f7e))
* Allowed null on eksempel and fagområde on validation. ([42775dd](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/42775dd))
* change validation scheme, kildebeskrivelse nullable ([a25bea8](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/a25bea8))

## 1.1.0 (2019-09-06)


### Bug Fixes

* **concept-catalogue-gui:** [#2001](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2001) add missing dependency ([664956b](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/664956b))
* **concept-catalogue-gui:** [#2234](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2234) fix bug with adding and removing sources ([666bc7a](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/666bc7a))
* **concept-catalogue-gui:** remove uglify plugin and add excluded files in tsconfig.json ([efdffae](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/efdffae))
* [#2059](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2059) add paddings and margins of form components ([765a2f7](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/765a2f7))
* [#2059](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2059) Added padding for FormGroups ([d3c410a](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/d3c410a))
* [#2059](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2059) form margins ([b88139e](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/b88139e))
* [#2059](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2059) helptext styling ([362b203](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/362b203))
* [#2059](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2059) Removed margin under h3 and set requiredbox color to color-warning-lightest. ([77d8f4b](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/77d8f4b))
* [#2059](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2059) Removed margin under h3 and set requiredbox color to color-warning-lightest. ([d5eb1c4](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/d5eb1c4))
* [#2059](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2059) Removed padding under help text. ([ec94a83](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/ec94a83))
* [#2123](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2123) Changed ledetekst for Kilde and color of icon. ([efa67f2](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/efa67f2))
* Changed color on new-source-button and title relationToSource ([28f104f](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/28f104f))
* Fixed warning to danger (color) ([bc1727d](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/bc1727d))
* Removed css class propegation. ([fb920dd](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/fb920dd))
* Removed README-backend.md and -hjelpetekster.md. ([91f4caf](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/91f4caf))
* Use named relative selfreference in docker-compose.override.yml, because the . is incorrectly resolved when multiple docker-compose files are combined. ([7faa9ba](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/7faa9ba))
* Using global replace to replace all links, not just one. ([3d3830f](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/3d3830f))
* **concept-catalogue-gui:** [#2088](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2088) fix sorting function so that it would not crash the app ([4678267](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/4678267))
* **concept-catalogue-gui:** [#2091](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2091) allow empty fields for omfang and contact information ([687806c](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/687806c))


### Features

* [#2136](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2136) Trigger relogin with deep backlink to self, if user does not have permissions for the selected resource ([c8fba98](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/c8fba98))
* **concept-catalogue-gui:** [#2001](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2001) use JSON Patch (RFC 6902) protocol to update concept ([9a3d0ef](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/9a3d0ef))
* [#2136](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2136) Add token to concept-catalogue-api requests ([bd524a3](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/bd524a3))
* [#2136](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2136) Logout ([a29ddc5](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/a29ddc5))
* [#2136](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2136) Require authentication ([91aec53](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/91aec53))
* [#2136](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2136) Show user's name ([ff22fbe](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/ff22fbe))
* Added icon-external-link after links in helptext and set color to color-link. ([281498f](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/281498f))
* Develop on host ([03ddb6e](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/03ddb6e))
* Markdown html-links opens in new tab. ([cd4fcaa](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/cd4fcaa))
* **concept-catalogue-gui:** [#2156](https://github.com/Informasjonsforvaltning/begrepskatalog/issues/2156) change bruksområde input field type to support tags ([0645f3a](https://github.com/Informasjonsforvaltning/begrepskatalog/commit/0645f3a))
