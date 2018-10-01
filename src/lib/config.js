import query from '@/lib/query'
import config from '@/config'

export default (...args) => {
  query('config', config.id, ...args)
}