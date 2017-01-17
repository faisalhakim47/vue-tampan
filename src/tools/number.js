export function toDigit(num, digit) {
  let str = num.toString()
  if (str.length < digit) {
    for (let i = digit - str.length; i--;) {
      str = '0' + str
    }
  }
  return str
}

export function toCurrency(num) {
  num = Math.floor(num).toString().split('')
  const length = num.length
  const each3 = Math.floor(length / 3)
  for (let i = 1; i <= each3; i++) {
    num.splice(length - i * 3, 0, '.')
  }
  if (num[0] === '.') {
    num.shift()
  }
  num = num.join('')
  return num
}
