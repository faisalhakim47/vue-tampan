import { toDigit } from './number.js'

export const days = [
  'Ahad',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jum\'at',
  'Sabtu'
]

export const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mey',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

export const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mey',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des'
]

export function getDayLengthInMonth(month, month2) {
  let year = 1970
  if (month2 != undefined) {
    year = month
    month = month2
  }
  month = typeof month === 'string' ? months.indexOf(month) : month
  return new Date(year, month, 0).getDate()
}

export function toIndoDate(date, mode) {
  date = new Date(date)
  const theMonths = mode === 'short' ? shortMonths : months
  if (!isFinite(date)) return null
  return `${toDigit(date.getDate(), 2)} ${theMonths[date.getMonth()]} ${date.getFullYear()}`
}

export function toTimeHour(date) {
  date = new Date(date)
  if (!isFinite(date)) return null
  return `${toDigit(date.getHours(), 2)}:${toDigit(date.getMinutes(), 2)}`
}

export function toISO8601(data, { includeDate = true, includeTime = false } = {}) {
  const date = new Date(data)
  if (!isFinite(date)) return null
  let ISODate = date.toISOString()
  if (!includeTime) ISODate = ISODate.slice(0, 10)
  if (!includeDate) ISODate = ISODate.slice(10)
  if (includeTime && !includeDate) ISODate = ISODate.slice(1, -1)
  return ISODate
}

export function fromISO8601(ISODate) {
  return new Date(ISODate)
}

export function dateToObject(date = new Date()) {
  date = new Date(date)
  return {
    minute: date.getMinutes(),
    hour: date.getHours(),
    date: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  }
}

export function objectToDate({ year = 0, month = 0, date = 0, hour = 0, minute = 0 } = {}) {
  return new Date(year, month, date, hour, minute)
}
