import { merge } from '@/helpers'

let config = {
  id: null,
  router: null,
  disabled: false,
  customResource: null,
  disableScriptLoader: false,
  checkDuplicatedScript: false
}

export const update = params => merge(config, params)

export default config