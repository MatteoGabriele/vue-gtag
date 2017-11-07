import { merge } from './helpers'

let config = {
  id: null
}

export const update = params => merge(config, params)

export default config