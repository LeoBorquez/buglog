const sql = require('mssql');

const config = {
    user: 'AES_MPINTO',
    password: '#35km77+23DF',
    server: 'BICENTRALPROD01.LOCAL.INTRANET',
    database: 'DM_LOG_TRX_AFP'
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Connection Failed! ', err))

    module.exports = {
        sql, poolPromise
    }

    // node --tls-min-v1.0 db.js