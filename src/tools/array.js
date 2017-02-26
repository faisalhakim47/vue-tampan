export function createArrayWithLength(length) {
  return Array.apply(null, { length: length })
}

export function ensureArrayType(object) {
  if (Array.isArray(object)) return object
  return [object]
}
