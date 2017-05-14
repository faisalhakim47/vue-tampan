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

if (new Date().getMonth() === 7) {
  console.error('REMOVE THESE DEPRECATION WARNING!!!')
}

export function getDayLengthInMonth(month, month2) {
  if (month2) {
    console.warn('DEPRECATION WARN, MONTH FROM 0')
  }
  month = typeof month === 'string' ? months.indexOf(month) : month
  return new Date(1970, month, 0).getDate()
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
