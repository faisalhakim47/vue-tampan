import { ensureArrayType } from '../tools/array'
import { getTampan, getRootInstance, whenTampanReady } from '../tampan'

export function loadAsyncRouteData(dataRequests) {
  return (destination, origin, next) => {
    const reqs = dataRequests.map(({ req }) => req(destination))
    const dataMaps = dataRequests.map(({ map }) => map)
    const reqsPromise = Promise.all(reqs)
      .then(datas => {
        next((vm) => {
          dataMaps.forEach((asyncDataFactory, i) => {
            asyncDataFactory(vm, datas[i])
          })
        })
      })
      .catch((error) => {
        console.warn('loadAsyncRouteData', error)
        const { status } = error.response
        const tampan = getTampan()
        const root = getRootInstance()
        tampan.confirm({
          text: `${status}: Gagal memuat data. Ulangi?`
        })
          .then(() => root.$router.push(destination))
          .catch(() => root.$router.push(origin))
      })
    whenTampanReady()
      .then(({ tampan }) => {
        tampan.useLoadingState(reqsPromise)
      })
  }
}
