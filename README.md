# node-koa-starter

[![npm version](https://badge.fury.io/js/%40naxmefy%2Fkoa-starter.svg)](https://badge.fury.io/js/%40naxmefy%2Fkoa-starter)

[![Build Status](https://travis-ci.org/naxmefy/node-koa-starter.svg?branch=master)](https://travis-ci.org/naxmefy/node-koa-starter)
[![Coverage Status](https://coveralls.io/repos/github/naxmefy/node-koa-starter/badge.svg?branch=master)](https://coveralls.io/github/naxmefy/node-koa-starter?branch=master)

## Installation

```
$ npm install --save @naxmefy/koa-starter
```

## Usage

```JavaScript
import Koa from 'koa'
import koaStarter from '@naxmefy/koa-starter'

const app = koaStarter(Koa, {})

if (!module.parent) {
  app.start()
}
```

## Usage (Testing - mocha + co-mocha + supertest)

```JavaScript
import supertest from 'supertest'
import app from '../src'

before(function () {
  this.app = koaStarter(Koa, {
      onBootstrap () {
        this.calledOnBooststrap = true
      }
    })
    this.request = supertest(this.app.start({
      port: null,
      ip: null
    }))
})

describe('app', function () {
  it('should be bootstrapped', function () {
    this.app.isBootstrapped.should.be.ok()
    this.app.calledOnBooststrap.should.be.ok()
  })

  it('should response 404', function * () {
    const response = yield this.request.get('/')

    response.status.should.be.eql(404)
  })
})
```
