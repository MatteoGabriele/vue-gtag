import { merge } from '@/helpers'

let settings = {
  id: null,
  vue: null,
  router: null,
  ignoreRoutes: [],
  routeTracking: {
    enabled: true,
    trackOnViewLoad: true,
    prependBase: true,
    pageviewTemplate: null,
    attachQueryString: true
  },
  disabled: false,
  customResource: null,
  disableScriptLoader: false,
  checkDuplicatedScript: false
}

export const update = params => merge(settings, params)

export default settings