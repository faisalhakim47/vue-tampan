// Modified version of http://stackoverflow.com/posts/11820717/revisions

/* global ActiveXObject */

export function requestFullScreen(el = document.documentElement) {
  const requestMethod = el.requestFullScreen
    || el.webkitRequestFullScreen
    || el.mozRequestFullScreen
    || el.msRequestFullscreen

  if (requestMethod) {
    requestMethod.call(el)
  }
  else if (typeof window.ActiveXObject !== "undefined") {
    const wscript = new ActiveXObject("WScript.Shell")
    if (wscript !== null) {
      wscript.SendKeys("{F11}")
    }
  }
  else {
    alert('Fullscreen mode is not available.')
  }
}

export function getFullscreenStatus() {
  return document.fullScreenElement || document.mozFullScreen || document.webkitIsFullScreen
}

export function exitFullScreen() {
  const requestMethod = document.exitFullScreen
    || document.webkitExitFullscreen
    || document.mozExitFullScreen
    || document.msExitFullScreen

  if (requestMethod) {
    requestMethod.call(document)
  }
  else if (typeof window.ActiveXObject !== "undefined") {
    const wscript = new ActiveXObject("WScript.Shell")
    if (wscript !== null) {
      wscript.SendKeys("{F11}")
    }
  }
  else {
    alert('Fullscreen mode is not available.')
  }
}

export function toggleFullscreen() {
  const docEl = document.documentElement
  const isInFullScreen = getFullscreenStatus()
  if (isInFullScreen) {
    exitFullScreen()
  }
  else {
    requestFullScreen(docEl)
  }
  return false
}
