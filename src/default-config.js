import env from '@naxmefy/env'
import * as _ from 'lodash'

export default {
  ip: env('IP'),
  port: env('PORT', 3000),

  host() {
    return `${this.ip || 'localhost'}:${this.port}`
  }
}
