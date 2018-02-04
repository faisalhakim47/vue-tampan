const isTouchDevice = !!('ontouchstart' in window || navigator.maxTouchPoints)
const isMobileOS = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)

export function getDeviceInfo({ largeScreenBreakpoint = 1024, mediumScreenBreakpoint = 768 } = {}) {
  const width = window.innerWidth
  const height = window.innerHeight
  const isLandscape = width > height
  const isPortrait = !isLandscape
  const isSmallScreen = width < mediumScreenBreakpoint
  const isMediumScreen = !isSmallScreen && width < largeScreenBreakpoint
  const isLargeScreen = !isSmallScreen && !isMediumScreen
  return {
    width,
    height,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    largeScreenBreakpoint,
    mediumScreenBreakpoint,
    isLandscape,
    isPortrait,
    isTouchDevice,
    isMobileOS,
  }
}
