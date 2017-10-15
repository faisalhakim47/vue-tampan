const maxMediumSize = 1024
const maxSmallSize = 768

export function getClienDeviceInfo() {
  const width = window.innerWidth
  const height = window.innerHeight
  const isLandscape = width > height
  const isPortrait = !isLandscape
  const isSmallScreen = width <= maxSmallSize
  const isMediumScreen = !isSmallScreen && width <= maxMediumSize
  const isLargeScreen = !isSmallScreen && !isMediumScreen
  const isTouchDevice = (isSmallScreen || isMediumScreen)
    && ('ontouchstart' in window || navigator.maxTouchPoints)
  const isMobileOS = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)
  return {
    width,
    height,
    isLandscape,
    isPortrait,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isTouchDevice,
    isMobileOS,
  }
}
