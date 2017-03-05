let currentTarget
export function doubleclick(handler) {
  let timeout
  const click = (event) => {
    if (currentTarget === event.target) {
      currentTarget = null
      handler(event)
      clearTimeout(timeout)
    } else {
      currentTarget = event.target
      timeout = setTimeout(() => currentTarget = null, 500)
    }
  }
  return { click }
}

export function longpress(handler) {
  let timeout
  const mousedown = () =>
    timeout = setTimeout(handler, 500)
  const mouseup = () =>
    clearTimeout(timeout)
  const mousemove = mouseup
  return { mousedown, mouseup, mousemove }
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
