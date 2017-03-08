import { ensureArrayType } from '../tools/array'
import { getTampan, whenTampanReady } from '../tampan'

export function loadAsyncRouteData(dataRequests) {
  return (destination, origin, next) => {
    const reqs = dataRequests.map((reqObject) => {
      return reqObject.req(destination).catch((error) => {
        if (typeof reqObject.err === 'function') {
          reqObject.err(error)
        }
      })
    })
    const dataMaps = dataRequests.map((reqObject) => reqObject.map)
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
