const { 
    modelInsertEquipmentFile,
    modelGetFileEquipmentById
    } = require('../models/file/file');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../token');
const { sendEmail } = require('../Email/email')
const { messagesEmail } = require('../lang/pt-br');

const fs = require('fs');
const path = require('path');
const { decode } = require('punycode');
  
async function uploadEquipmentFileController(req, res, next) {
    try {
        const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
        const decryptToken = jwt.verify(token, secretKey);
        if (decryptToken.type_access_user_id == 2)
            return res.status(200).json({ error: "Acesso negado." });

        const equipmentId = req.query.equipment;
        let dataFile = req.file;
        let data = {};
        data.path = req.file.originalname;
        data.id = equipmentId;

        if ((/image/gi).test(dataFile.mimetype)) {
          if ( req.file.size < 16000000) {
              const file = await modelInsertEquipmentFile(data);

              if (file.affectedRows == 0)
                return res.status(401).json({ error: "Erro ao atualizar dados do equipamento."});
  
              res.status(200).json({menssage: "Imagem do equipamento salvo com sucesso.", data: file, status: "Sucesso"});
          } else {
            return res.status(200).json({ error: "Tamnho da imagem acima do limite." });
          }
        } else {
            return res.status(200).json({ error: "Arquivo de envio nao suportado." });
        }
    } catch(err) {
      console.log(err);
      return res.status(404).json({ error: "Erro ao inserir imagem do equipamento",  detailedError: err.message, stackTrace: err.stack });
    }
  }

  function getContentType(extensao) {
    try {
      switch (extensao) {
        case '.pdf':
          return 'application/pdf';
        case '.png':
          return 'image/png';
        case '.jpg':
        case '.jpeg':
          return 'image/jpeg';
        case '.bmp':
          return 'image/bmp';
        case '.svg':
          return 'image/svg+xml';
        case '.gif':
          return 'image/gif';
        default:
          return 'application/octet-stream';
      }
    } catch {
      throw new Error('Erro ao enviar extensao do arquivo.'); 
    }
  }

  
async function getFileEquipmentByIdController(req, res, next) {
    try {
      const projectId = req.query.equipment;
      const token = req.query.token;
    
      const resultEquipmentImg = await modelGetFileEquipmentById(projectId)
      if(!resultEquipmentImg || !resultEquipmentImg.photo)
        return res.status(200).json({ error: "Nao possui equipamento ou imagem com esse ID." });
      
      const filePath = path.join(__dirname, '..', 'uploads', 'equipment', resultEquipmentImg.photo);  
      if (fs.existsSync(filePath)) {
        const extensao = path.extname(filePath);
        const contentType = getContentType(extensao);
        res.setHeader('Content-disposition', `attachment; filename=${filePath}`);
        res.setHeader('Content-type', contentType);
        res.setHeader('Authorization', `Bearer ${token}`);
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
      } else {
        return res.status(200).json({ error: "Arquivo nao encontrado." });
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