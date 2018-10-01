import { update } from '@/config'
import init from '@/init'
import * as lib from '@/lib'

export default function install (Vue, options = {}) {
  Vue.prototype.$gtag = Vue.$gtag = lib

  update(options)
  init()
}

// export { default as query } from '@/lib/query'
// export { default as config } from '@/lib/config'
// export { default as page } from '@/lib/page'
// export { default as disableTracking } from '@/disable-tracking'

export const config = lib.config
export const page = lib.page
export const query = lib.query
export const disableTracking = lib.disableTracking