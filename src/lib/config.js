import query from '@/lib/query'
import settings from '@/settings'

export default (...args) => {
  query('config', settings.id, ...args)
}