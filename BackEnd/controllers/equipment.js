const jwt = require('jsonwebtoken');
const { secretKey } = require('../token');

const { 
    modelAddNewEquipment,
    modelAddNewHistoryEquipment,
    modelAllEquipments,
    modelEquipmentById,
    modelUpdateEquipmentById
 } = require('../models/equipment/equipment');

async function addNewEquipmentController(req, res, next) {
  try {
      const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
      const decryptToken = jwt.verify(token, secretKey);
      if (decryptToken.type_access_user_id == 2) // DEFAULT
        return res.status(200).json({ error: "Acesso negado." });
      
      let data = req.body;
    
      if(!data.name || !data.id_sector || !data.id_status_calibration || !data.description || !data.get_equipment || !data.return_equipment)
        return res.status(200).json({ error: "Necessario inserir todas as informaçõe." });

      data.id_user = decryptToken.id
      const newEquipement = await modelAddNewEquipment(data);
      if (newEquipement.affectedRows == 0)
        return res.status(401).json({ error: "Erro ao criar novo equipamento."});

      const newHistoryEquipement = await modelAddNewHistoryEquipment(data, newEquipement.insertId);
      if (newHistoryEquipement.affectedRows == 0)
        return res.status(401).json({ error: "Erro ao criar historico equipamento."});

      res.status(200).json({menssage: "Equipamento criado com sucesso.", data: newEquipement, status: "Sucesso"});
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: "Erro ao inserir novo equipamento",  detailedError: err.message, stackTrace: err.stack });
  }
}

async function getAllEquipmentsController(req, res, next){
    try{
      const equipments = await modelAllEquipments();
      if(!equipments)
        return res.status(200).json({ error: "Não possui equipamentos" });
    
        res.status(200).json(equipments)
    }catch(err){
      return res.status(404).json({ error: "Erro ao buscar equipamentos" });
    }
}

async function getEquipmentByIdController(req, res, next){
    try{
      const id = req.query.id;
      const equipment = await modelEquipmentById(id);
      if(!equipment || equipment.length == 0)
        return res.status(200).json({ error: "Id Não encontrado" });
    
        res.status(200).json(equipment)
    }catch(err){
      return res.status(404).json({ error: "Erro ao buscar equipamento" });
    }
}

async function upadteEquipmentByIdController(req, res, next){
    try{
        const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
        const decryptToken = jwt.verify(token, secretKey);
        if (decryptToken.type_access_user_id == 2) // DEFAULT
            return res.status(200).json({ error: "Acesso negado." });

        const data = req.body;
        const resultUpdate = await modelUpdateEquipmentById(data);
        if (resultUpdate.affectedRows == 0)
            return res.status(401).json({ error: "Erro ao atualizar dados do equipamento."});

        res.status(200).json({menssage: "Equipamento atualizado com sucesso.", data: resultUpdate, status: "Sucesso"});
    }catch(err){
      return res.status(404).json({ error: "Erro ao atualizar dados do equipamento." });
    }
}

async function insertEquipmentHistoryController(req, res, next){
    try{
        const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
        const decryptToken = jwt.verify(token, secretKey);
        if (decryptToken.type_access_user_id == 2) // DEFAULT
            return res.status(200).json({ error: "Acesso negado." });

        const data = req.body;
        const id = req.query.id
        const newHistoryEquipement = await modelAddNewHistoryEquipment(data, id, decryptToken.id);
        if (newHistoryEquipement.affectedRows == 0)
            return res.status(401).json({ error: "Erro ao criar historico equipamento."});

        res.status(200).json({menssage: "Novo historico do equipamento salvo com sucesso.", data: newHistoryEquipement, status: "Sucesso"});
    }catch(err){
      return res.status(404).json({ error: "Erro ao atualizar dados do equipamento." });
    }
}

module.exports = { 
    addNewEquipmentController,
    getAllEquipmentsController,
    getEquipmentByIdController,
    upadteEquipmentByIdController,
    insertEquipmentHistoryController
};