import { ensureArrayType } from '../tools/array'
import { getTampan, whenTampanReady } from '../tampan'

const errorHandlers = []

export function addAsyncRouteDataErrorHandler(errorHandlerFn) {
  errorHandlers.push(errorHandlerFn)
}

export function loadAsyncRouteData(dataRequests) {
  return (destination, origin, next, opt = {}) => {
    const reqs = dataRequests.map((reqObject) => {
      return reqObject.req(destination).catch((error) => {
        const isErrorDefined = typeof reqObject.err === 'function'
        const errorPromise = isErrorDefined
          ? reqObject.err(error, destination)
          : Promise.resolve()
        const isErrorThenable = !!errorPromise.then
        const thenableError = (fn) => {
          isErrorThenable
            ? errorPromise.then(() => fn(error, destination))
            : fn(error, destination)
        }
        errorHandlers.forEach((errorHandlerFn) => thenableError(errorHandlerFn))
      })
    })
    const dataMaps = dataRequests.map((reqObject) => reqObject.map)
    const reqsPromise = Promise.all(reqs)
      .then(datas => {
        const callback = (vm) => {
          dataMaps.forEach((asyncDataFactory, i) => {
            const data = datas[i]
            if (typeof data !== 'object') return
            asyncDataFactory(vm, data)
          })
        }
        next(
          opt.vm
            ? callback(opt.vm)
            : callback
        )
      })
    whenTampanReady()
      .then(({ tampan }) => {
        tampan.useLoadingState(reqsPromise)
      })
  }
}
