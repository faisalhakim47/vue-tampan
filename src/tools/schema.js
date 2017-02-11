export class Schema {
  constructor(model) {
    this.model = model
  }

  shape(data) {
    if (data === undefined) data = {}

    const obj = {}

    for (const key in this.model) {
      const factory = this.model[key].type || this.model[key]
      const dataKey = data[key]

      if (dataKey == undefined) {
        const defaults = this.model[key].defaults
        if (defaults !== undefined)
          obj[key] = defaults
        else {
          if (Array.isArray(factory))
            obj[key] = []
          else if (typeof factory === 'function' && !isPrimitiveType(factory)) {
            obj[key] = factory(dataKey, data, key)
          }
          else if (factory instanceof Schema)
            obj[key] = factory.shape()
        }
      }
      else
        obj[key] = factoryShape(factory, data, key, dataKey)
    }
    return obj
  }

  validate(data) {
    if (data == undefined)
      return false

    for (const key in this.model) {
      const typeSet = this.model[key]
      const isRequired = typeSet.required && !typeSet.defaults
      const dataKey = data[key]
      const { type, validate } = typeSet

      if (isRequired && dataKey === undefined)
        return false

      if (typeof validate === 'function' && !validate(dataKey))
        return false

      if (type instanceof Schema && !type.validate(dataKey))
        return false

      if (Array.isArray(type)) {
        if (!dataKey) continue

        const arrayType = type[0]
        if (!arrayType)
          throw new Error('arrayType is undefined')

        if (arrayType instanceof Schema) {
          if (Array.isArray(dataKey)) {
            const unvalidate = dataKey
              .map((data) => {
                return arrayType.validate(data)
              })
              .find((d) => {
                return d === false
              })
            if (unvalidate === false)
              return false
          }
          else if (!arrayType.validate(dataKey))
            return false
        }
      }
    }
    return true
  }
}

function factoryShape(factory, data, key, dataKey) {
  if (isPrimitiveType(factory))
    return handlePrimitiveType(dataKey, factory)

  else if (Array.isArray(factory)) {
    if (factory[0] !== undefined) {
      factory = factory[0]
      if (Array.isArray(dataKey))
        return dataKey.map((dataKey) => {
          return factoryShape(factory, data, key, dataKey)
        })
      else if (dataKey == undefined)
        return []
      else
        return [factoryShape(factory, data, key, dataKey)]
    }
    else
      return Array.isArray(dataKey) ? dataKey : [dataKey]
  }

  else if (typeof factory === 'function')
    return factory(dataKey, data, key)

  else if (factory instanceof Schema)
    return factory.shape(dataKey)
}

function isPrimitiveType(type) {
  return [Number, String, Boolean, Date, Array].indexOf(type) !== -1
}

function handlePrimitiveType(data, factory) {
  switch (factory) {
    case String:
      return '' + data

    case Number:
      return parseFloat(data)

    case Boolean:
      return !!data

    case Date:
      return new Date(data)

    case Array:
      return Array.isArray(data) ? data : [data]
  }
}
