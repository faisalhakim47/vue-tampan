const fs = require('fs')
const path = require('path')

function createFullPath(relativePath) {
  return path.join(__dirname, relativePath)
}

// https://github.com/agusibrahim/kode-pos/raw/master/out/kodepos.csv

const dataStr = fs.readFileSync(createFullPath('./kodepos.csv'), { encoding: 'utf8' })
const results = []

dataStr.split('\r\n').slice(1).forEach((row, index) => {
  row = row.split(';')
  row.shift()
  row[0] = parseInt(row[0], 10)
  const dt2 = row.splice(3, 1)[0]
  row[3] = row[3] + ' ' + (dt2 === 'Kabupaten' ? 'Kab.' : dt2)
  if (dt2 !== 'Kabupaten' && dt2 !== 'Kota') {
    return console.log(dt2, row)
  }
  if (row[0]) results.push(row)
})

fs.writeFileSync(createFullPath('./kodepos.json'), JSON.stringify(results), { encoding: 'utf8' })
