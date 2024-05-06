const { ConnectionDB } = require('../../DataBase/Connection');
const {
    getAllSector,
  } = require('./query');

async function modelAllSectors(){
    conn = await ConnectionDB.getConnection();
    try{
      const [result] = await conn.execute(getAllSector);
      return result;
    }catch(err){
        console.log(err)
        console.log({menssage: "Erro ao buscar lista de setores"})
    }finally{
      if(conn)
        conn.release();
    }
}

module.exports = { 
    modelAllSectors
};