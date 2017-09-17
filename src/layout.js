import { getClienDeviceInfo } from './tools/client-device'
import { throttle } from './tools/throttle'

function toggleBodyClass(className, condition) {
  const classList = document.body.classList
  if (condition) classList.add(className)
  else classList.remove(className)
}

export function initiateLayout({ tampan }) {
  const screenChangeHandler = throttle(() => {
    tampan.client = getClienDeviceInfo()
  }, 500)
  window.addEventListener('resize', screenChangeHandler)
  window.addEventListener('orientationchange', screenChangeHandler);

  tampan.$watch(() => {
    const {
      isLargeScreen,
      isMediumScreen,
      isSmallScreen,
      height,
    } = tampan.client
    toggleBodyClass('is-largescreen', isLargeScreen)
    toggleBodyClass('is-mediumscreen', isMediumScreen)
    toggleBodyClass('is-smallscreen', isSmallScreen)
  })

  tampan.$watch(() => {
    toggleBodyClass('is-sidebar-toggleable', tampan.isSidebarToggleable)
  })

  tampan.$watch(() => {
    if (tampan.isSidebarToggleable) {
      tampan.isSidebarShow = false
    }
  })
}
