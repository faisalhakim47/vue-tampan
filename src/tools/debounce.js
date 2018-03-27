export function debounce(func, duration = 100) {
  let debounceTimeout = null
  let lastValue = undefined
  function debounceFunc(...args) {
    if (debounceTimeout) clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      lastValue = func.apply(this, args)
    }, duration)
  }
  return debounceFunc
}
