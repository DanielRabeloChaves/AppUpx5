const { 
    modelInsertEquipmentFile
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
        data.path = req.file.path;
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
  
  module.exports = {
    uploadEquipmentFileController
  };