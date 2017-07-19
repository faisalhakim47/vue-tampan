export function objectToQueryString(obj) {
  const queryString = Object.keys(obj)
    .map((key) => {
      const value = encodeURIComponent(obj[key])
      return `${key}=${value}`
    })
    .join('&')
  return queryString
}

export function request(method, url, { data, query }) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()
    if (query) {
      url += `?${objectToQueryString(query)}`
    }
    req.open(method, url, true)
    req.setRequestHeader('Content-Type', 'application/json')
    req.addEventListener('load', () => {
      resolve(JSON.parse(req.responseText))
    })
    req.addEventListener('error', reject)
    req.send(JSON.stringify(data))
  })
}
