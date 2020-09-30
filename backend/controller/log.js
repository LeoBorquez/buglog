const { sql, poolPromise } = require('../database/db');
const fs = require('fs');

var rawdata = fs.readFileSync('./query/queriesLog.json');
var queries = JSON.parse(rawdata);

class LogController {

    async getLogUser(req, res) {
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getLogUser)
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.recordset, null, 2));
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    }

    async getLogGiros(req, res){
        try {
            const pool = await poolPromise
            const result = await pool.request()
                .query(queries.getLogGiros)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.recordset, null, 2));
        } catch(err){
            res.status(500)
            res.send(err.message)
        }
    }

}

const log = new LogController();
module.exports = log;