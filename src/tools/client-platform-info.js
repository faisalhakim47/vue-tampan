const maxMediumSize = 800
const maxSmallSize = 480

export function getClienInfo() {
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
