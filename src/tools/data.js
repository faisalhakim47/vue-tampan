import { ensureArrayType } from '../tools/array'
import { getTampan, whenTampanReady } from '../tampan'

export function loadAsyncRouteData(dataRequests) {
  return (destination, origin, next) => {
    const reqs = dataRequests.map(({ req, err }) => {
      return req(destination).catch((error) => {
        if (typeof err === 'function') err(error)
      })
    })
    const dataMaps = dataRequests.map(({ map }) => map)
    const reqsPromise = Promise.all(reqs)
      .then(datas => {
        next((vm) => {
          dataMaps.forEach((asyncDataFactory, i) => {
            asyncDataFactory(vm, datas[i])
          })
        })
      })
    whenTampanReady()
      .then(({ tampan }) => {
        tampan.useLoadingState(reqsPromise)
      })
  }
}
