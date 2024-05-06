const express = require('express')
const router = express.Router();
const { verifyToken } = require('../token');
const { 
    getAllUserController,
    addNewUserController,
    authenticationController,
    forgetPasswordController
 } = require('../controllers/user');

router.get('/all', verifyToken, getAllUserController);
router.post('/create', addNewUserController);
router.post('/login', authenticationController);
router.post('/forgetpassword', forgetPasswordController);

module.exports = router;