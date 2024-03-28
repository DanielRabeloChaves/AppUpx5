const { 
    modelAllUser
   } = require('../models/user/user');

async function getAllUserController(req, res, next){
    try{
        const user = await modelAllUser();
        if(!user)
          return res.status(200).json({ error: "Não possui usuarios" });
    
        res.status(200).json(user)
    }catch(err){
      return res.status(404).json({ error: "Erro ao buscar usuarios" });
    }
}

module.exports = { 
    getAllUserController
};