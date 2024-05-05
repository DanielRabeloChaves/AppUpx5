const express = require('express')
const router = express.Router();
const { verifyToken } = require('../token');
const { 
    getAllStatusCalibrationController
 } = require('../controllers/calibration');

router.get('/status/all', verifyToken, getAllStatusCalibrationController);

module.exports = router;