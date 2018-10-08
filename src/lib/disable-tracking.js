import settings from '@/settings'

export default (disable = true) => {
  if (typeof window === 'undefined') {
    return
  }

  window[`ga-disable-${settings.id}`] = disable
}