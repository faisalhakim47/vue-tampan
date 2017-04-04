import { throttle } from './tools/throttle'
import { getClienDeviceInfo } from './tools/client-device-info'

export function initialLayout(app, tampan) {
  const elApp = document.getElementById('app')

  app.$watch('$route', () => {
    if (!tampan.client.isLargeScreen)
      tampan.isSidebarEnabled = false
  })

  window.addEventListener('resize', throttle(() => {
    tampan.$emit('window:resize')
    tampan.client = getClienDeviceInfo()
    tampan.isSidebarEnabled = tampan.client.isLargeScreen
  }, 500))

  tampan.$watch(() => {
    const {
      isLargeScreen,
      isMediumScreen,
      isSmallScreen,
      height
    } = tampan.client

    if (isLargeScreen) elApp.classList.add('is-largescreen')
    else elApp.classList.remove('is-largescreen')

    if (isMediumScreen) elApp.classList.add('is-mediumscreen')
    else elApp.classList.remove('is-mediumscreen')

    if (isSmallScreen) elApp.classList.add('is-smallscreen')
    else elApp.classList.remove('is-smallscreen')
  })

  tampan.$watch(() => {
    if (tampan.isSidebarShow) elApp.classList.add('is-sidebarshow')
    else elApp.classList.remove('is-sidebarshow')
  })

  tampan.$watch(() => {
    if (tampan.isFullscreen) elApp.classList.add('is-fullscreen')
    else elApp.classList.remove('is-fullscreen')
  })
}
