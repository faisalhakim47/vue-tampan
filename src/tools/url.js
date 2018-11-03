export function objectToQueryString(obj) {
  const queryString = Object.keys(obj)
    .map((key) => {
      let value = obj[key]
      if (!value) return
      value = encodeURIComponent(value)
      return `${key}=${value}`
    })
    .filter(part => part)
    .join('&')
  return queryString
}
