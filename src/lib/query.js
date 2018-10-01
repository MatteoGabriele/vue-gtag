export default function query (method, ...args) {
  if (typeof window === 'undefined') {
    return
  }

  window.dataLayer = window.dataLayer || []

  const gtag = window.gtag = () => window.dataLayer.push(arguments)

  gtag(method, ...args)
}