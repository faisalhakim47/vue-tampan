import { toDigit } from './number'

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

export function toIndoDate(date) {
  return `${toDigit(date.getDate(), 2)} ${shortMonths[date.getMonth()]} ${date.getFullYear()}`
}

export function toTimeHour(date) {
  return `${toDigit(date.getHours(), 2)}:${toDigit(date.getMinutes(), 2)}`
}

export function toISO8601(date) {
  return `${date.getFullYear()}-${toDigit(date.getMonth() + 1, 2)}-${toDigit(date.getDate(), 2)}`
}

export function fromISO8601(date) {
  date = date.split('-')
  return new Date(
    parseInt(date[0], 10),
    parseInt(date[1], 10) - 1,
    parseInt(date[2], 10)
  )
}
