export function throttle(func, duration = 100) {
  let isThrotted = false
  let pendingFunc = false
  const throttledFunc = function (...args) {
    if (isThrotted) {
      return pendingFunc = () => throttledFunc.apply(this, args)
    }
    isThrotted = true
    setTimeout(() => {
      isThrotted = false
      if (typeof pendingFunc === 'function') {
        pendingFunc()
      }
      pendingFunc = false
    }, duration)
    func.apply(this, args)
  }
  return throttledFunc
}
