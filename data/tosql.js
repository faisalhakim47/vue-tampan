const fs = require('fs')
const path = require('path')

function createFullPath(relativePath) {
  return path.join(__dirname, relativePath)
}

const data = JSON.parse(
  fs.readFileSync(createFullPath('./kodepos.json'), { encoding: 'utf8' })
)

let sql = `
drop table if exists idn_address;
create table if not exists idn_address (
  id int not null auto_increment,
  postalcode int not null,
  village varchar(255) not null,
  district varchar(255) not null,
  regency varchar(255) not null,
  province varchar(255) not null,
  primary key(id)
) engine=InnoDB;
`

data.forEach((row) => {
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
  sql += `
    insert into idn_address (postalcode, village, district, regency, province)
    values (${row.join(',')});
  `
})

fs.writeFileSync(createFullPath('./kodepos.sql'), sql, { encoding: 'utf8' })
