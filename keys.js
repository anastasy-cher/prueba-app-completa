require('dotenv').config()

module.exports = {

    database:{
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'db_links'
    },
    database_cc:{
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    }
}