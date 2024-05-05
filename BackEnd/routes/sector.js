const express = require('express')
const router = express.Router();
const { verifyToken } = require('../token');
const { 
    getAllSectorController
 } = require('../controllers/sector');

router.get('/all', verifyToken, getAllSectorController);

module.exports = router;