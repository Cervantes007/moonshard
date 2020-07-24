> Nodejs framework to build high-performance app in no time

![CI](https://github.com/cervantes007/moonshard/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/cervantes007/moonshard/branch/master/graph/badge.svg)](https://codecov.io/gh/cervantes007/moonshard)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/cervantes007/moonshard)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## Introduction

MoonShard was created to improve the development phase and bring high-performance in production environments.
It's easy to start, to use and deploy.

## Features:
- Provide CLI and project scaffolding.
- Logs works and rotate file per day.
- Auto generate `api-docs`.
- Typescript first-class support.
- Full tested.
- Easy deployment to classic server, dockers, serverless or wired into microservices.

## Installation

```
yarn create create-moonshard my-app
```

## Manual Installation

1. Install the npm package
```shell script
yarn add moonshard
```

2. TypeScript configuration:
Make sure you are using TypeScript version 3.3 or higher, and you have enabled the following settings in `tsconfig.json`:
```
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

## Documentation

To check out `guides`, `api documentation` and `examples`, visit [moonshard docs](http://cervantes007.github.io/moonshard/).

## New Features and Issues

You can help to improve MoonShard by create issues for [new features](https://github.com/Cervantes007/moonshard/issues/new?assignees=&labels=&template=feature_request.md&title=) 
or [reporting bugs](https://github.com/Cervantes007/moonshard/issues/new?assignees=&labels=&template=bug_report.md&title=)
 
## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/cervantes007/moonshard/releases).


## Contributions

Please make sure to read the `Contributing Guide` before making a pull request. 
Thank you to all the people who already contributed to MoonShard!

#### Guide for Developers

1. Get the repo and install dependencies
```
$ git clone https://github.com/cervantes/moonshard.git
$ cd moonshard
$ yarn install
```

3. Available scripts
```
$ yarn dev
$ yarn build
$ yarn lint
$ yarn test
$ yarn test:coverage
$ yarn docs:dev
```

## License
[MIT](http://opensource.org/licenses/MIT)

© Copyright 2020 Cervantes

