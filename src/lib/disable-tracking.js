import config from '@/config'

export default (disable = true) => {
  if (typeof window === 'undefined') {
    return
  }

  window[`ga-disable-${config.id}`] = disable
}