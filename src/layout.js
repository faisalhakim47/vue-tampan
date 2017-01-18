import { throttle } from './tools/throttle'
import { getClienInfo } from './tools/client-platform-info'

export function initialLayout(app, tampan) {
  window.addEventListener('resize', throttle(() => {
    tampan.client = getClienInfo()
    tampan.isSidebarShow = tampan.client.isLargeScreen
  }, 500))

  app.$watch('$route', () => {
    if (!tampan.client.isLargeScreen)
      tampan.isSidebarShow = false
  })

  function updateClientViewState() {
    const elApp = document.getElementById('app')
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

    // document.querySelector('.main-container').style.height = (height - 48) + 'px'
  }
  updateClientViewState()
  tampan.$watch('client', updateClientViewState)

  function updateSidebarViewState() {
    const elApp = document.getElementById('app')
    if (tampan.isSidebarShow) elApp.classList.add('is-sidebarshow')
    else elApp.classList.remove('is-sidebarshow')
  }
  updateSidebarViewState()
  tampan.$watch('isSidebarShow', updateSidebarViewState)

  function updateFullscreenViewState() {
    const elApp = document.getElementById('app')
    if (tampan.isFullscreen) elApp.classList.add('is-fullscreen')
    else elApp.classList.remove('is-fullscreen')
  }
  updateFullscreenViewState()
  tampan.$watch('isFullscreen', updateFullscreenViewState)
}
