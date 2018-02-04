let worker
let messageId = 0
const queues = {}

if (typeof window !== 'undefined') {
  const workerScript = `
  self.addEventListener('message', (event) => {
    const data = event.data || {}
    const options = data.options || {}
    const headers = options.headers || {}
    const request = new XMLHttpRequest()
    const resolveStatus = (error) => {
      let result
      try {
        result = JSON.parse(request.responseText)
      } catch (e) {
        result = request.responseText
      }
      self.postMessage({
        ok: !error,
        id: data.id,
        status: request.status,
        data: result,
        error: error,
      })
    }
    request.open(data.method, data.url)
    Object.keys(headers).forEach((name) => {
      request.setRequestHeader(name, headers[name])
    })
    request.addEventListener('error', (error) => {
      console.log(error)
      resolveStatus(error)
    })
    request.addEventListener('readystatechange', () => {
      if (request.readyState === 4) {
        if (request.status < 400) {
          resolveStatus()
        } else  {
          resolveStatus(true)
        }
      }
    })
    request.send(
      options.data && typeof options.data === 'object'
        ? JSON.stringify(options.data)
        : options.data
    )
  })
  `

  const workerBlob = new Blob([workerScript], {
    type: 'text/javascript',
  })

  worker = new Worker(URL.createObjectURL(workerBlob, {
    oneTimeOnly: true
  }))

  worker.addEventListener('message', (event) => {
    const result = event.data
    const { resolve, reject } = queues[result.id]
    if (result.ok) resolve({
      status: result.status,
      data: result.data,
    })
    else reject(result)
    queues[result.id] = undefined
  })
}

export function request(method, url, options = {}) {
  return new Promise((resolve, reject) => {
    const id = messageId++
    queues[id] = { resolve, reject }
    worker.postMessage({
      id,
      method,
      url,
      options,
    })
  })
}
