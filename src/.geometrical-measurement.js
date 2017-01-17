function findPossibleSubstraction(num) {
  const obj = {}
  for (let i = 1; i < num; i++)
    if ((num / i) % 1 === 0)
      obj[i] = true
  return Object.keys(obj).map((str) => parseInt(str, 10))
}

window.s = (num) => {
  const res = findPossibleSubstraction(num)
  const increment = 100
  console.log(num, res.filter(n => n < increment))
  for (let i = increment; i < 1366; i += increment) {
    const min = i
    const max = i + increment
    setTimeout(() => console.log(num, res.filter(n => n > min && n < max)), i)
  }
}

s(1366)
s(1200)
s(1024)
s(800)
s(768)
s(720)
s(640)
s(600)
s(480)
s(320)
s(240)
