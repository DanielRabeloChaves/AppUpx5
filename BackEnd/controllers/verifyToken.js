const { verifyToken } = require('../models/verifyToken');
  
  async function verifyTokenController(req, res, next){
    try{
      const token = await verifyToken();
  
      if(!token)
        return res.status(404).json({token: false, error: "Usuários não encontrado."});
  
      res.status(200).json(token)
    }catch(err){
      console.log("Erro ao verificar token")
      return res.status(404).json({token: false, error: "Usuários não encontrado."});
    }
  }

  module.exports = { 
    verifyTokenController, 
   };