import { ensureArrayType } from '../tools/array'
import { getTampan, whenTampanReady } from '../tampan'

const globalErrorHandlers = []

export function addAsyncRouteDataErrorHandler(errorHandlerFn) {
  globalErrorHandlers.push(errorHandlerFn)
}

export function loadAsyncRouteData(reqObjects) {
  return (destination, origin, next, optional = {}) => {
    // This is weird. Inside of this function, error doesnt thrown.
    // Uncomment throw statement below and it will be ignored
    /* throw { test: true } */

    const reqs = reqObjects.map((reqObject) => {
      const Request = typeof reqObject.req === 'function'
        ? reqObject.req(destination)
        : reqObject.req
      return Request.catch((error) => {
        const isErrorHandlerExist = typeof reqObject.err === 'function'
        const errorPromise = isErrorHandlerExist
          ? Promise.resolve(reqObject.err(error, destination))
          : Promise.resolve()
        globalErrorHandlers.forEach((globalErrorHandlerFn) => {
          errorPromise.then(() => globalErrorHandlerFn(error, destination))
        })
      })
    })

    const dataMappers = reqObjects.map((reqObject) => reqObject.map)

    const reqsPromise = Promise.all(reqs)
      .then((dataResults) => {
        const doDataMapping = (vm) => dataMappers.forEach((dataMapper, index) => {
          const data = dataResults[index]
          if (typeof data !== 'object') return
          dataMapper(vm, data)
        })
        const isOptionalVMExist = !!optional.vm
        next(
          isOptionalVMExist
            ? doDataMapping(optional.vm)
            : (vm) => doDataMapping(vm)
        )
      })

    whenTampanReady()
      .then(({ tampan }) => {
        tampan.useLoadingState(reqsPromise)
      })
  }
}
