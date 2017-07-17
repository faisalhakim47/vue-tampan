const fs = require('fs')
const path = require('path')
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mts_alasror'
})

connection.connect()

function executeSql(sqlQuery) {
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (error, results, fields) => {
      if (error) return reject(error)
      resolve(results)
    })
  })
}

function createFullPath(relativePath) {
  return path.join(__dirname, relativePath)
}

const data = JSON.parse(
  fs.readFileSync(createFullPath('./kodepos.json'), { encoding: 'utf8' })
)

function insertRow() {
  let row = data.shift()
  if (!row) return console.log('DONE')
  row = row.map((cell) => {
    if (typeof cell === 'string') {
      cell = cell
        .replace(/\'/g, "\\'")
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
      return `'${cell}'`
    }
    return cell
  })
  executeSql(`
    insert into idn_address (postalcode, village, district, regency, province)
    values (${row.join(',')})
  `).then(() => {
      console.log(`insert ${row[0]},`, data.length, 'left')
      insertRow()
    }).catch((error) => {
      console.log(`ERROR: insert ${row[0]}:`, row, error)
    })
}

executeSql(`
  drop table if exists idn_address
`).then(() => {
    return executeSql(`
      create table if not exists idn_address (
        id int not null auto_increment,
        postalcode int not null,
        village varchar(255) not null,
        district varchar(255) not null,
        regency varchar(255) not null,
        province varchar(255) not null,
        primary key(id)
      ) engine=InnoDB;
    `)
  })
  .then(insertRow)
  .catch((error) => {
    console.log(error)
  })
