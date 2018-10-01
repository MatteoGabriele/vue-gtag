import { update } from '@/config'
import init from '@/init'

export default function install (Vue, options = {}) {
  update(options)
  init()
}

export { default as query } from '@/lib/query'
export { default as config } from '@/lib/config'
export { default as page } from '@/lib/page'