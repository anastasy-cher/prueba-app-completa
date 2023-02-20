const mysql = require('mysql2/promise')
const { database, database_cc } = require('./keys')
let db_utilizar

if(process.env.ENTORNO == 'production'){
    db_utilizar = database_cc
}else{
    db_utilizar = database
}

console.log(db_utilizar)
const pool = mysql.createPool(db_utilizar)

module.exports = pool