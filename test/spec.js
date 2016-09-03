import Koa from 'koa'
import supertest from 'supertest'

import koaStarter from '../src'

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
