export function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function isJSONString(string) {
  try {
    JSON.parse(string)
    return true
  } catch (e) {
    return false
  }
}

export function getPath(target, path) {
  const pathSegments = path.split('.')
  return pathSegments.reduce((holder, pathSegment) => {
    return holder[pathSegment]
  }, target)
}

export function setPath(target, path, newValue) {
  const pathSegments = path.split('.')
  const lastPath = pathSegments.pop()
  const holder = pathSegments.reduce((holder, pathSegment) => {
    return holder[pathSegment]
  }, target)
  holder[lastPath] = newValue
}

