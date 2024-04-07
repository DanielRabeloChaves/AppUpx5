const express = require('express')
const router = express.Router();
const rateLimit = require('express-rate-limit')
const { verifyToken } = require('../token');
const { 
    getAllUserController,
    addNewUserController,
    authenticationController,
    forgetPasswordController
 } = require('../controllers/user');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

router.get('/all', verifyToken, getAllUserController);
router.post('/cadastro', addNewUserController);
router.post('/login', authenticationController);
router.post('/forgetpassword', forgetPasswordController);

module.exports = router;