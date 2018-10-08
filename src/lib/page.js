import config from '@/lib/config'
import settings from '@/settings'
import {
  getBasePath,
  getQueryString,
  isRouteIgnored,
  isRoute
} from '@/helpers'

const page = (...args) => {
  if (args.length && isRoute(args[0])) {
    trackRoute(args[0])
    return
  }

  config(...args)
}

const trackRoute = route => {
  if (isRouteIgnored(route)) {
    return
  }

  const { router, routeTracking } = settings
  const { meta: { analytics = {} } } = route
  const proxy = analytics.pageviewTemplate || routeTracking.pageviewTemplate

  if (proxy) {
    page(proxy(route))
    return
  }

  const {
    attachQueryString,
    prependBase
  } = routeTracking

  const queryString = getQueryString(route.query)
  const base = router && router.options.base
  const needsBase = prependBase && base

  let path = route.path + (attachQueryString ? queryString : '')
  path = needsBase ? getBasePath(base, path) : path

  config({
    ...(route.name && { 'page_title' : route.name }),
    'page_path': path,
    'page_location': window.location.href
  })
}

export const routeTracking = () => {
  const { router, vue, routeTracking: auto } = settings

  if (auto.trackOnViewLoad) {
    trackRoute(router.currentRoute)
  }

  router.afterEach((to, from) => {
    const isSamePath = to.path === from.path
    const isTrackingEnabled = Boolean(auto.enabled && router)

    if (!isTrackingEnabled || isSamePath) {
      return
    }

    vue.nextTick(() => {
      trackRoute(from)
    })
  })
}

export default page