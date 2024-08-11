require('dotenv').config();
const { 
    modelInsertEquipmentFile,
    modelGetFileEquipmentById
    } = require('../models/file/file');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../token');
const { getContentType } = require('../helpers/scripts');
const Storage = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

const cloudStorage = new Storage({
  keyFilename: path.join(__dirname, "../upx5-423113-1704adeed3a4.json"),
  projectId: process.env.CLOUD_project_id
})

const AMBIENT_DEV = process.env.AMBIENT_DEV
  
async function uploadEquipmentFileController(req, res, next) {
    try {
        const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
        const decryptToken = jwt.verify(token, secretKey);
        if (decryptToken.type_access_user_id == 2)
            return res.status(200).json({ error: "Acesso negado." });

        const equipmentId = req.query.equipment;
        let data = {};
        data.path = req.file.originalname;
        data.id = equipmentId;

        if (!(/image/gi).test(req.file.mimetype))
          return res.status(200).json({ error: "Tamnho da imagem acima do limite." });

        if ( req.file.size > 16000000)
          return res.status(200).json({ error: "Arquivo de envio nao suportado." });
          
        const file = await modelInsertEquipmentFile(data);

        if (file.affectedRows == 0)
          return res.status(401).json({ error: "Erro ao atualizar dados do equipamento."});

        const localFilePath = path.join(__dirname, '..', 'uploads', 'equipments', req.file.originalname);  
        if (!fs.existsSync(localFilePath))
          return res.status(200).json({ error: "Arquivo nao encontrado." });

        if(!AMBIENT_DEV){
          const gcs = await cloudStorage.bucket("gs://upx5");
          const filePath = `uploads/equipments/${req.file.originalname}`;
          const extensao = await path.extname(req.file.originalname);

          const result = await gcs.upload(localFilePath, {
              destination: filePath,
              metadata: {
                  contentType: getContentType(extensao), //application/csv for excel or csv file upload
              }
          });
        }

        res.status(200).json({menssage: "Imagem do equipamento salvo com sucesso.", data: file, status: "Sucesso"});
    } catch(err) {
      console.log(err);
      return res.status(404).json({ error: "Erro ao inserir imagem do equipamento",  detailedError: err.message, stackTrace: err.stack });
    }
}

async function getFileEquipmentByIdController(req, res, next) {
    try {
      const equipmentId = req.query.equipment;
      const token = req.query.token;
    
      const resultEquipmentImg = await modelGetFileEquipmentById(equipmentId)
      if(!resultEquipmentImg || !resultEquipmentImg.photo)
        return res.status(200).json({ error: "Nao possui equipamento ou imagem com esse ID." });
      
      const extensao = path.extname(resultEquipmentImg.photo);
      const contentType = getContentType(extensao);
      res.setHeader('Content-disposition', `attachment; filename=${resultEquipmentImg.photo}`);
      res.setHeader('Content-type', contentType);
      res.setHeader('Authorization', `Bearer ${token}`);
    
      const filePath = `uploads/equipments/${resultEquipmentImg.photo}`;
    
      if(AMBIENT_DEV){
        const localFilePath = path.join(__dirname, '..', 'uploads', 'equipments', resultEquipmentImg.photo);  
        if (!fs.existsSync(localFilePath))
          return res.status(200).json({ error: "Arquivo nao encontrado." });
  
        const localFileStream = fs.createReadStream(localFilePath);
        localFileStream.pipe(res);
      }else{
        const cloudFile = cloudStorage.bucket('upx5').file(filePath);
        const [cloudExists] = await cloudFile.exists();
        if (!cloudExists) 
          return res.status(200).json({ error: "Arquivo não encontrado no GCS." });
  
        const cloudFileStream = await cloudFile.createReadStream();
        cloudFileStream.on('error', err => res.status(500).send('Erro ao ler o arquivo.'))
        cloudFileStream.pipe(res);
      }
    } catch(err) {
      console.log(err)
      return res.status(404).send('Arquivo não encontrado');
    }
  }
  
  module.exports = {
    uploadEquipmentFileController,
    getFileEquipmentByIdController
  };