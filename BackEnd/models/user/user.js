const { ConnectionDB } = require('../../DataBase/Connection');
const { 
    getAllUser
  } = require('./query');

async function modelAllUser(){
    try{
      conn = await ConnectionDB.getConnection();
      const [user] = await conn.execute(getAllUser);
      conn.release();
      return user;
    }catch(err){
      console.log("Erro ao buscar lista de usuarios")
      console.log(err)
    }
}

module.exports = { 
    modelAllUser
   };