import { update } from '@/settings'
import init from '@/init'
import * as lib from '@/lib'

export const install =  (Vue, options = {}) => {
  Vue.prototype.$gtag = Vue.$gtag = lib

  update({
    ...options,
    vue: Vue
  })

  init()
}

export const config = lib.config
export const page = lib.page
export const query = lib.query
export const event = lib.event
export const set = lib.set
export const disableTracking = lib.disableTracking

export default install