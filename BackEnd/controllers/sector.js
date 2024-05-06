const jwt = require('jsonwebtoken');
const { secretKey } = require('../token');

const { 
    modelAllSectors
 } = require('../models/sector/sector');


async function getAllSectorController(req, res, next){
    try{
      const sectors = await modelAllSectors();
      if(!sectors)
        return res.status(200).json({ error: "Não possui setores" });
    
        res.status(200).json(sectors)
    }catch(err){
      console.log(err)
      return res.status(404).json({ error: "Erro ao buscar setores" });
    }
}

module.exports = { 
    getAllSectorController
};