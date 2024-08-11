const express = require('express')
const router = express.Router();
const { 
    uploadEquipmentFileController,
    getFileEquipmentByIdController
 } = require('../controllers/file');
const multer = require('multer');
const fs = require('fs');
const { secretKey } = require('../token');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../token');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        try {
            const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
            const decryptToken = jwt.verify(token, secretKey);
            let type_access = decryptToken.type_access_user_id;
            if (type_access !== 2) {
                if ((/image/gi).test(file.mimetype)) {
                    const pathProject = `uploads/equipments`;
                    const pathArq = `${pathProject}/`;
                    if (!fs.existsSync(pathProject)) 
                        fs.mkdirSync(pathProject, { recursive: true });
                    
                    cb(null, pathArq);
                } else {
                    throw new Error('Formato do arquivo inválido')
                }
            }
        } catch (err) {
            console.log(err)
            throw new Error('Erro ao salvar o arquivo no diretório.');
        }
    },
    filename: function (req, file, cb) {
        try {
            const filename = `${file.originalname}`;
            cb(null, filename);
        } catch (err) {
            console.log(err)
            throw new Error('Erro ao mudar nome do arquivo para salvar no diretório.');
        }
    }
});

let upload = multer({ storage: storage })

router.post('/equipment/postfile', verifyToken, upload.single('file'), uploadEquipmentFileController);
router.get('/equipment/', getFileEquipmentByIdController);

module.exports = router;
