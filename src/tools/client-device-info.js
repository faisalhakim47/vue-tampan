const maxMediumSize = 1024
const maxSmallSize = 768

export function isTouchDevice() {
  return 'ontouchstart' in window 
    || navigator.maxTouchPoints
};

export function getClienDeviceInfo() {
  const width = window.innerWidth
  const height = window.innerHeight
  const isLandscape = width > height
  const isPortrait = !isLandscape
  const isSmallScreen = width <= maxSmallSize
  const isMediumScreen = !isSmallScreen && width <= maxMediumSize
  const isLargeScreen = !isSmallScreen && !isMediumScreen
  return {
    width,
    height,
    isLandscape,
    isPortrait,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen
  }
}
