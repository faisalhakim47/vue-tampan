const largeScreenBreakpoint = 1024
const mediumScreenBreakpoint = 768

export function getDeviceInfo() {
  const userAgent = navigator.userAgent
  const isTouchDevice = !!('ontouchstart' in window || navigator.maxTouchPoints)
  const isMobileOS = userAgent.indexOf('Mobile') !== -1
    || userAgent.indexOf('Android') !== -1
    || userAgent.indexOf('Opera Mini') !== -1
  const isPageSpeed = userAgent.indexOf('Page Speed') !== -1
  const width = document.body.clientWidth
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
    isPageSpeed,
  }
}
