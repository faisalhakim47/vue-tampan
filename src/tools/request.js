import { objectToQueryString } from './url.js'

let messageId = 0
const queues = {}

const workerScript = `
  self.addEventListener('message', function (event) {
    var data = event.data || {};
    var options = data.options || {};
    var headers = options.headers || {};
    var request = new XMLHttpRequest();
    var resolveStatus = function resolveStatus(error) {
      var result;
      try {
        result = JSON.parse(request.responseText);
      } catch (e) {
        result = request.responseText;
      }
      self.postMessage(JSON.stringify({
        ok: !error,
        id: data.id,
        status: request.status,
        data: result,
        error: error,
      }));
    }
    request.open(data.method, data.url);
    Object.keys(headers).forEach(function (name) {
      request.setRequestHeader(name, headers[name]);
    });
    request.addEventListener('error', function (error) {
      console.warn(error);
      resolveStatus(error);
    });
    request.addEventListener('readystatechange', function () {
      if (request.readyState === 4) {
        if (request.status < 400) {
          resolveStatus();
        }
        else {
          resolveStatus(true);
        }
      }
    });
    request.send(
      options.data && typeof options.data === 'object'
        ? JSON.stringify(options.data)
        : options.data
    );
  });
`

const workerBlob = new Blob([workerScript], {
  type: 'text/javascript',
})

const worker = new Worker(URL.createObjectURL(workerBlob, {
  oneTimeOnly: true,
}))

worker.addEventListener('message', (event) => {
  const result = JSON.parse(event.data)
  const { resolve, reject } = queues[result.id]
  if (result.ok) resolve({
    status: result.status,
    data: result.data,
  })
  else reject(result)
  queues[result.id] = undefined
})

/**
 * @typedef {object} RequestOption
 * @property {import("http").IncomingHttpHeaders} headers 
 * @property {any} query 
 * @property {any} data 
 */

/**
 * @template Value
 * @param {string} method 
 * @param {string} url 
 * @param {RequestOption} options 
 * @returns {Promise<Value>}
 */
export function request(method, url = '', options = {}) {
  if (url[0] === '/') {
    url = location.origin + url
  }
  if (options.query && typeof options.query === 'object') {
    const query = objectToQueryString(options.query)
    const sparator = url.indexOf('?') === -1 ? '?' : '&'
    url = `${url}${sparator}${query}`
  }
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
