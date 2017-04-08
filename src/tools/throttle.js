export function throttle(func, duration = 100) {
  let isThrotted = false
  let pendingFunc = false
  let lastValue = null
  const throttledFunc = function (...args) {
    if (isThrotted) {
      pendingFunc = () => throttledFunc.apply(this, args)
      return lastValue
    }
    isThrotted = true
    setTimeout(() => {
      isThrotted = false
      if (typeof pendingFunc === 'function') {
        pendingFunc()
      }
      pendingFunc = false
    }, duration)
    return lastValue = func.apply(this, args)
  }
  return throttledFunc
}
