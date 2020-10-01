const sql = require('mssql');
require('tls').DEFAULT_MIN_VERSION = 'TLSv1'
require('dotenv').config();


const dev = {
    user: process.env.USERNAME_DEV,
    password: process.env.PASSWORD_DEV,
    server: process.env.SERVER_DEV,
    database: process.env.DB_DEV,
    options: {
        trustedConnection: true,
    }
}

const prod = {
    user: process.env.USERNAME_PROD,
    password: process.env.PASSWORD_PROD,
    server: process.env.SERVER_PROD,
    database: process.env.DB_PROD,
    options: {
        trustedConnection: true,
    }
}

const poolPromiseDev = new sql.ConnectionPool(dev)
    .connect()
    .then(pool => {
        console.log('[-] Connected to MSSQL: dev ' + dev.server + '\n')
        return pool
    })
    .catch(err => console.log('[-] Connection Failed Dev! ', err + '\n'))


const poolPromiseProd = new sql.ConnectionPool(prod)
    .connect()
    .then(pool => {
        console.log('[-] Connected to MSSQL: prod ' + prod.server + '\n')
        return pool
    })
    .catch(err => console.log('[-] Connection Failed Prod! ', err + '\n'))


module.exports = {
    sql, poolPromiseDev, poolPromiseProd
}
