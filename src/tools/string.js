const charlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charlength = charlist.length

export function randomChar(length = 1) {
  let str = ''
  while (length--) {
    str += charlist[Math.floor(Math.random() * charlength)]
  }
  return str
}

// function test(char = 2, itteration = 10) {
//   const results = []
//   while (itteration--) {
//     let notFound = true
//     const testObj = {}
//     let count = 0
//     while (notFound) {
//       const random = randomChar(char)
//       if (testObj[random]) {
//         notFound = false
//         results.push(count)
//         break
//       }
//       testObj[random] = true
//       count++
//     }
//   }
//   return results.reduce((a, b) => a + b, 0) / results.length
// }

// window.r = randomChar
// window.t = test
