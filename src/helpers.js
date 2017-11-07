export function merge (obj, src) {
  Object.keys(src).forEach(function (key) {
    if (obj[key] && typeof obj[key] === 'object') {
      merge(obj[key], src[key])
      return
    }
    obj[key] = src[key]
  })

  return obj
}