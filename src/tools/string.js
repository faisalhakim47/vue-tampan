const charlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charlength = charlist.length

export function randomChar(length = 1) {
  let str = ''
  while (length--) {
    str += charlist[Math.floor(Math.random() * charlength)]
  }
  return str
}

// function test(char = 1) {
//   let notFound = true
//   const testObj = {}
//   let count = 0
//   while (notFound) {
//     const random = randomChar(char)
//     if (testObj[random]) {
//       notFound = false
//       console.log('count', count)
//       break
//     }
//     testObj[random] = true
//     count++
//   }
// }

// window.t = test
