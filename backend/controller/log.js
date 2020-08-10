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
            res.json(result.recordset)
        } catch (error) {
            res.status(500)
            res.send(err.message)
        }
    }

}

const log = new LogController();
module.exports = log;