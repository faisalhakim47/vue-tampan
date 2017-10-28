import { getClienDeviceInfo } from './tools/client-device'
import { throttle } from './tools/throttle'

function changeBodyClass(className, condition) {
  const classList = document.body.classList
  if (condition) classList.add(className)
  else classList.remove(className)
}

export function initiateLayout({ tampan }) {
  const screenChangeHandler = () => tampan.client = getClienDeviceInfo()
  window.addEventListener('resize', screenChangeHandler, { passive: true })
  window.addEventListener('orientationchange', screenChangeHandler, { passive: true })

  tampan.$watch(() => {
    const {
      isLargeScreen,
      isMediumScreen,
      isSmallScreen,
      height,
    } = tampan.client
    changeBodyClass('is-largescreen', isLargeScreen)
    changeBodyClass('is-mediumscreen', isMediumScreen)
    changeBodyClass('is-smallscreen', isSmallScreen)
  })

  tampan.$watch(() => {
    changeBodyClass('is-sidebar-toggleable', tampan.isSidebarToggleable)
  })

  tampan.$watch(() => {
    if (tampan.isSidebarToggleable) {
      tampan.isSidebarShow = false
    }
  })
}
