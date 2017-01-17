export function throttle(func, duration = 100) {
  let isThrotted = false
  let isPending = false
  return () => {
    if (isThrotted) return isPending = true
    isThrotted = true
    setTimeout(() => {
      if (isPending) func()
      isThrotted = false
    }, duration)
    func()
  }
}
