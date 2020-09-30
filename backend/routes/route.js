const express = require('express')
const controller = require('../controller/controller');
const { getLogUser, getLogGiros } = require('../controller/log');

const router = express.Router();
router.delete('/api/deleteData/:id', controller.deleteData);

router.get('/getLogUser', getLogUser);
router.get('/getLogGiros', getLogGiros);

module.exports = router;