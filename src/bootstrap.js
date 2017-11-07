import config from './config'

const loadScript = url => {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.async = true
    script.src = url
    script.charset = 'utf8'

    head.appendChild(script)

    script.onload = resolve
    script.onerror = reject
  })
}

export default () => {
  const { id } = config

  if (!id) {
    throw new Error('[vue-gtag] Missing tracking ID in the configuration object')
  }

  // Apparently is now mandatory to add the ID in the url
  // but what if we have more then one ID?
  const scriptURL = `https://www.googletagmanager.com/gtag/js?id=${id}`
  
  loadScript(scriptURL)
    .then(() => {
      window.dataLayer = window.dataLayer || []
      const gtag = () => dataLayer.push(arguments)

      gtag('js', new Date())
      gtag('config', id)
    })
    .catch(error => {
      console.log(error.message)
    })
}