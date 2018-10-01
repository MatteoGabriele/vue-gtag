import config from './config'

export default (disable = true) => {
  if (typeof window === 'undefined') {
    return
  }
  console.log(`ga-disable-${config.id}`, disable)
  window[`ga-disable-${config.id}`] = disable
}