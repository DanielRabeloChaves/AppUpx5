const express = require('express')
const rateLimit = require('express-rate-limit')
const router = express.Router();
const { verifyTokenController } = require('../controllers/verifyToken');

const { verifyToken } = require('../token');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

router.get('/', verifyToken, verifyTokenController);

module.exports = router;