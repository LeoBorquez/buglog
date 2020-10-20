const { sql, poolPromiseDev, poolPromiseProd } = require('../database/db');
const util = require('util');
const fs = require('fs');

var rawdata = fs.readFileSync('./query/queriesLog.json');
var queries = JSON.parse(rawdata);

class LogController {

    async getLogUser(req, res) {
        let server = req.query.server
        // getLogUser @FechaIni = '2020-08-05', @FechaFin = '2020-08-07', @Rut = '10874571'
        let query = util.format(queries.getLogUser, req.query.startDate, req.query.endDate, req.query.rut)

        try {
            const pool = (server === true) ? await poolPromiseProd : await poolPromiseDev
            const result = await pool.request()
                .query(query)
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.recordset, null, 2));
        } catch (err) {
            res.status(500)
            res.send(err.message)
        }
    }

    async getLogGiros(req, res){
        let server = req.query.server
        let query = util.format(queries.getLogGiros, req.query.startDate, req.query.endDate, req.query.codigo, req.query.rut)
        try {
            const pool = await poolPromiseDev
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