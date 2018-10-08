import settings, { update } from '@/settings'
import { loadScript, promisify } from '@/helpers'
import query from '@/lib/query'
import disableTracking from '@/lib/disable-tracking'
import { routeTracking } from '@/lib/page'

export default () => {
  const {
    id,
    disabled,
    customResource,
    checkDuplicatedScript,
    disableScriptLoader
  } = settings

  if (!id) {
    throw new Error('[vue-gtag] Missing tracking ID in the configuration object')
  }

  const resource = customResource || `https://www.googletagmanager.com/gtag/js`
  const queue = [
    promisify(id),
    promisify(disabled)
  ]

  if (!(checkDuplicatedScript && hasScript()) && !disableScriptLoader) {
    queue.push(loadScript(resource).catch(() => {
      throw new Error (
        `[vue-gtag] An error occured! Please check your connection ` +
        `or if you have any trackers blocker installed in your browser.`
      )
    }))
  }

  Promise.all(queue).then(response => {
    update({
      id: response[0],
      disabled: response[1]
    })

    disableTracking(disabled)
    routeTracking()
  }).catch(error => {
    console.error(error.message)
  })

  query('js', new Date())
  query('config', id)
}