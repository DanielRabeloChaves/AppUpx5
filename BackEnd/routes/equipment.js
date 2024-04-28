const express = require('express')
const router = express.Router();
const { verifyToken } = require('../token');
const { 
    addNewEquipmentController,
    getAllEquipmentsController,
    getEquipmentByIdController,
    upadteEquipmentByIdController,
    insertEquipmentHistoryController
 } = require('../controllers/equipment');

router.post('/create', verifyToken, addNewEquipmentController);
router.get('/all', verifyToken, getAllEquipmentsController);
router.get('/', verifyToken, getEquipmentByIdController);
router.patch('/', verifyToken, upadteEquipmentByIdController);
router.post('/history/create', verifyToken, insertEquipmentHistoryController);

module.exports = router;