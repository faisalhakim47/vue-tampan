export function longpress(handler) {
  let timeout
  const mousedown = () =>
    timeout = setTimeout(handler, 500)
  const mouseup = () =>
    clearTimeout(timeout)
  const mousemove = mouseup
  return { mousedown, mouseup, mousemove }
}
