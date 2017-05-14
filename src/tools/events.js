import { isTouchDevice } from './client-device-info'

const isTouchEnabled = !!isTouchDevice()

export function click(handler) {
  if (isTouchEnabled) return { touchstart: handler }
  else return { click: handler }
}

let currentTarget
export function doubleclick(handler) {
  let timeout
  const doubleClickHandler = (event) => {
    if (currentTarget === event.target) {
      currentTarget = null
      handler(event)
      clearTimeout(timeout)
    } else {
      currentTarget = event.target
      timeout = setTimeout(() => currentTarget = null, 500)
    }
  }
  return click(doubleClickHandler)
}

export function longpress(handler) {
  let timeout
  const startHandler = () =>
    timeout = setTimeout(handler, 500)
  const endHandler = () =>
    clearTimeout(timeout)
  const moveHandler = endHandler
  return isTouchEnabled
    ? {
      touchstart: startHandler,
      touchend: endHandler,
      touchmove: moveHandler
    }
    : {
      mousedown: startHandler,
      mouseup: endHandler,
      mousemove: moveHandler
    }
}

export function mergeEvents(events) {
  const eventGroup = {}
  events.forEach((event) => {
    Object.keys(event).forEach((eventName) => {
      const eventsHolder = eventGroup[eventName] || (eventGroup[eventName] = [])
      eventsHolder.push(event[eventName])
    })
  })
  const eventObj = {}
  Object.keys(eventGroup).forEach((eventName) => {
    eventObj[eventName] = (e) => eventGroup[eventName].forEach(handler => handler(e))
  })
  return eventObj
}
