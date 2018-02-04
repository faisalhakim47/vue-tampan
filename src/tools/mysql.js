import { toISO8601 } from './date.js'
import { toDigit } from './number.js'

export function toMysqlDate(date) {
  date = new Date(date)
  if (!isFinite(date)) return null
  return toISO8601(date)
}

export function toMysqlDateTime(datetime) {
  datetime = new Date(datetime)
  if (!isFinite(datetime)) return null
  return datetime.getUTCFullYear() + "-" + toDigit(1 + datetime.getUTCMonth(), 2) + "-" + toDigit(datetime.getUTCDate(), 2) + " " + toDigit(datetime.getUTCHours(), 2) + ":" + toDigit(datetime.getUTCMinutes(), 2) + ":" + toDigit(datetime.getUTCSeconds(), 2)
}

export function fromMysqlDateTime(datetime) {
  datetime = new Date(datetime)
  if (!isFinite(datetime)) return null
  datetime.setHours(datetime.getHours() + (datetime.getTimezoneOffset() / -60))
  return datetime
}
