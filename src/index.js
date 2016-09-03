import http from 'http'
import * as _ from 'lodash'
import defaultConfig from './default-config'

export default function (Koa, config) {
  const app = new Koa()

  app.server = http.createServer(app.callback())
  app.context.config = _.defaults(config, defaultConfig)

  app.error = console.error.bind(console)
  app.log = console.log.bind(console)

  app.isBootstrapped = false
  app.bootstrap = function (customConfig) {
    _.defaults(customConfig, {})
    Object.assign(this.context.config, customConfig)

    /* istanbul ignore else */
    if (_.isFunction(this.context.config.onBootstrap)) {
      this.context.config.onBootstrap.call(this)
    }

    this.isBootstrapped = true
    return this
  }

  app.start = function (customConfig) {
    _.defaults(customConfig, {})
    this.bootstrap(customConfig)
    return this.server.listen(
      this.context.config.port,
      this.context.config.ip,
      err => {
        /* istanbul ignore if */
        if (err) {
          this.error(err)
        } else {
          this.log(`running on ${this.context.config.host()}`)
        }
      }
    )
  }

  return app
}
