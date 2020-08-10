const express = require('express')
const controller = require('../controller/controller');
const { getLogUser } = require('../controller/log');

const router = express.Router();
router.delete('/api/deleteData/:id', controller.deleteData);

router.get('/getLog', getLogUser);

module.exports = router;