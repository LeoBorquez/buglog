const express = require('express')
const controller = require('../controller/controller')
const log = require('../controller/log')

const router = express.Router();
router.get('/api/getAllData', controller.getAllData);
router.post('/api/addNewData/:id', controller.addNewData);
router.put('/api/updateData/:id', controller.updateData);
router.delete('/api/deleteData/:id', controller.deleteData);



router.get('/api/getLogUser', log.getLog);

module.exports = router;