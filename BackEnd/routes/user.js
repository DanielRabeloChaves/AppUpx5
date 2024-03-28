const express = require('express')
const router = express.Router();
const rateLimit = require('express-rate-limit')
const { 
    getAllUserController
 } = require('../controllers/user');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

router.get('/all', getAllUserController);

module.exports = router;