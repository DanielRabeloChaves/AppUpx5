const { ConnectionDB } = require('../../DataBase/Connection');
const {
    getAllStatusCalibration,
  } = require('./query');

async function modelAllStatusCalibration(){
    conn = await ConnectionDB.getConnection();
    try{
      const [result] = await conn.execute(getAllStatusCalibration);
      return result;
    }catch(err){
        console.log(err)
        console.log({menssage: "Erro ao buscar lista de status calibragem."})
    }finally{
      if(conn)
        conn.release();
    }
}

module.exports = { 
    modelAllStatusCalibration
};