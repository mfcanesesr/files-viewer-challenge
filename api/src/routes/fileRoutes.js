const express = require('express');
const controller = require('../controllers/fileController');

const router = express.Router();

router.get('/list', controller.getFilesList);

router.get('/data', controller.getFilesData);

module.exports = router;
