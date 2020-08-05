const express = require('express')
const controller = require('../controller/controller')

const router = express.Router();
router.get('/api/getAllData', controller.getAllData);
router.post('/api/addNewData', controller.addNewdata);
router.put('/api/updateData', controller.updateData);
router.delete('/api/deleteDAta', controller.deleteData);

module.exports = router;