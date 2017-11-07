import bootstrap from './bootstrap'
import { update } from './config'

export default function install (Vue, options = {}) {
  update(options)
  bootstrap()
}