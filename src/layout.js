import { getDeviceInfo } from './tools/device.js'
import { throttle } from './tools/throttle.js'

function condRootClass(className, condition) {
  const classList = document.body.classList
  if (condition) classList.add(className)
  else classList.remove(className)
}

export function initiateLayout(tampan) {
  const screenChangeHandler = throttle(() => {
    tampan.$emit('screen_resize')
    tampan.client = getDeviceInfo()
  }, 500)
  window.addEventListener('resize', screenChangeHandler, { passive: true })
  window.addEventListener('orientationchange', screenChangeHandler, { passive: true })

  tampan.$watch(() => {
    const {
      isLargeScreen,
      isMediumScreen,
      isSmallScreen,
      isLandscape,
      isPortrait,
      isTouchDevice,
      isMobileOS,
    } = tampan.client
    condRootClass('is-largescreen', isLargeScreen)
    condRootClass('is-mediumscreen', isMediumScreen)
    condRootClass('is-smallscreen', isSmallScreen)
    condRootClass('is-landscape', isLandscape)
    condRootClass('is-portrait', isPortrait)
    condRootClass('is-touchdevice', isTouchDevice)
    condRootClass('is-mobileos', isMobileOS)
  })

  tampan.$watch(() => {
    condRootClass('is-sidebar-toggleable', tampan.isSidebarToggleable)
  })

  tampan.$watch(() => {
    if (tampan.isSidebarToggleable) {
      tampan.isSidebarShow = false
    }
  })

}
