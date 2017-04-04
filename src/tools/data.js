import { ensureArrayType } from '../tools/array'
import { getTampan, whenTampanReady } from '../tampan'

const globalErrorHandlers = []

export function addAsyncRouteDataErrorHandler(errorHandlerFn) {
  globalErrorHandlers.push(errorHandlerFn)
}

export function loadAsyncRouteData(dataRequests) {
  return (destination, origin, next, optional = {}) => {
    const reqs = dataRequests.map((reqObject) => {
      const Request = typeof reqObject === 'function'
        ? reqObject.req(destination)
        : reqObject.req
      return Request.catch((error) => {
        const isErrorHandlerExist = typeof reqObject.err === 'function'
        const errorPromise = isErrorHandlerExist
          ? reqObject.err(error, destination)
          : Promise.resolve()
        const isErrorThenable = !!errorPromise.then
        const thenableError = (fn) => {
          isErrorThenable
            ? errorPromise.then(() => fn(error, destination))
            : fn(error, destination)
        }
        globalErrorHandlers.forEach((globalErrorHandlerFn) => thenableError(globalErrorHandlerFn))
      })
    })
    const dataMaps = dataRequests.map((reqObject) => reqObject.map)
    const reqsPromise = Promise.all(reqs)
      .then((dataResults) => {
        const proccesMapping = (vm) => dataMaps.forEach((asyncDataMapper, i) => {
          const data = dataResults[i]
          if (typeof data !== 'object') return
          asyncDataMapper(vm, data)
        })
        const isOptionalVMExist = !!optional.vm
        next(
          isOptionalVMExist ? proccesMapping(optional.vm) : proccesMapping
        )
      })
    whenTampanReady()
      .then(({ tampan }) => {
        tampan.useLoadingState(reqsPromise)
      })
  }
}
