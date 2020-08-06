const sql = require('mssql');
require('tls').DEFAULT_MIN_VERSION = 'TLSv1'
require('dotenv').config();


const config = {
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DB,
    options: {
        trustedConnection: true,
      }
}

console.log(config)

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('[-] Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('[-] Connection Failed! ', err))

    module.exports = {
        sql, poolPromise
    }

