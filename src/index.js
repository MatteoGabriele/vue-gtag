import { update } from '@/config'
import init from '@/init'
import * as lib from '@/lib'

export default function install (Vue, options = {}) {
  Vue.prototype.$gtag = Vue.$gtag = lib

  update(options)
  init()
}

export const config = lib.config
export const page = lib.page
export const query = lib.query
export const disableTracking = lib.disableTracking