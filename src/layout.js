import { throttle } from './tools/throttle'
import { getClienDeviceInfo } from './tools/client-device-info'

export function initialLayout(root, tampan) {
  const elApp = document.getElementById('app')
  const elMainContainer = document.getElementById('main-container')
  const isFirefox = typeof InstallTrigger !== 'undefined'

  function closeModalIfExist() {
    const currentModal = tampan.modalList[0]
    const isModalExist = !!currentModal
    if (currentModal) currentModal.resolve()
    return isModalExist
  }

  // fix firefox flexbox
  if (isFirefox) {
    tampan.$watch(() => {
      elMainContainer.style.minHeight = `${tampan.client.height - 48}px`
    })
  }

  root.$watch('$route', () => {
    if (!tampan.client.isLargeScreen)
      tampan.isMainMenuEnabled = false
  })

  root.$router.beforeEach((destination, origin, next) => {
    let isNextRouteAllowed = true
    const isModalExist = closeModalIfExist()
    if (isModalExist) {
      isNextRouteAllowed = false
    }
    const isMainMenuShow = tampan.isMainMenuShow
      && tampan.isMainMenuToggleable
    if (isMainMenuShow) {
      // isNextRouteAllowed = false
    }
    next(isNextRouteAllowed)
  })

  tampan.$watch(() => {
    const {
      isLargeScreen,
      isMediumScreen,
      isSmallScreen,
      height
    } = tampan.client
    root.$nextTick().then(() => {
      if (isLargeScreen) elApp.classList.add('is-largescreen')
      else elApp.classList.remove('is-largescreen')
      if (isMediumScreen) elApp.classList.add('is-mediumscreen')
      else elApp.classList.remove('is-mediumscreen')
      if (isSmallScreen) elApp.classList.add('is-smallscreen')
      else elApp.classList.remove('is-smallscreen')
    })
  })

  tampan.$watch(() => {
    if (tampan.isMainMenuShow) root.$nextTick().then(() => {
      setTimeout(() => {
        elApp.classList.add('is-mainmenu-show')
      }, 50)
    })
    else root.$nextTick().then(() => {
      elApp.classList.remove('is-mainmenu-show')
    })
  })

  tampan.$watch(() => {
    if (tampan.isFullscreen) root.$nextTick().then(() => {
      elApp.classList.add('is-fullscreen')
    })
    else root.$nextTick().then(() => {
      elApp.classList.remove('is-fullscreen')
    })
  })

  window.addEventListener('resize', throttle(() => {
    tampan.$emit('window:resize')
    tampan.client = getClienDeviceInfo()
    tampan.isMainMenuEnabled = tampan.client.isLargeScreen
  }, 500))

  window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 27:
        closeModalIfExist()
        break
    }
  })
}
