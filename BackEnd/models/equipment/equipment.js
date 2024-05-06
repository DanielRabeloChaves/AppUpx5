const { ConnectionDB } = require('../../DataBase/Connection');
const { 
    insertNewEquipment,
    insertNewHistoryEquipment,
    getAllEquipments,
    getEquipmentByID,
    updateEquipment,
    getEquipmentHistoryById
  } = require('./query');

async function modelAddNewEquipment(dataEquipment){
    conn = await ConnectionDB.getConnection();
    try{
        const data = {
          name: dataEquipment.name,
          description: dataEquipment.description
        }
        const [result] = await conn.execute(insertNewEquipment, Object.values(data));
        return result;
    }catch(err){
        console.log(err)
        console.log({menssage: "Erro ao adicionar novo equipamento"})
    }finally{
        if(conn)
        conn.release();
    }
}

async function modelAddNewHistoryEquipment(dataEquipment, idEquipment, id_user){
    conn = await ConnectionDB.getConnection();
    try{
        const data = {
            id_equipment: idEquipment,
            id_user: id_user,
            id_sector: dataEquipment.id_sector,
            id_status_calibration: dataEquipment.id_status_calibration,
            local: dataEquipment.local,
            get_equipment: dataEquipment.get_equipment,
            return_equipment: dataEquipment.return_equipment
        }
        const [result] = await conn.execute(insertNewHistoryEquipment, Object.values(data));
        return result;
    }catch(err){
        console.log(err)
        console.log({menssage: "Erro ao adicionar historico do equipamento"})
    }finally{
        if(conn)
        conn.release();
    }
}

async function modelAllEquipments(){
    conn = await ConnectionDB.getConnection();
    try{
      const [result] = await conn.execute(getAllEquipments);
      return result;
    }catch(err){
      console.log({menssage: "Erro ao buscar lista de equipamentos"})
    }finally{
      if(conn)
        conn.release();
    }
}

async function modelEquipmentById(id){
    conn = await ConnectionDB.getConnection();
    try{
      let result
      [[result]] = await conn.execute(getEquipmentByID, [id]);
      let [historyEquipment] = await conn.execute(getEquipmentHistoryById, [id])
      historyEquipment.map(item => {
        item.local = JSON.parse(item.local) 
      })
      result.history = historyEquipment
      return result;
    }catch(err){
      console.log({menssage: "Erro ao buscar equipamento por id"})
    }finally{
      if(conn)
        conn.release();
    }
}

async function modelUpdateEquipmentById(data){
    conn = await ConnectionDB.getConnection();
    try{
      const [result] = await conn.query(updateEquipment(data), Object.values(data));
      return result;
    }catch(err){
      console.log({menssage: "Erro ao atualizar dados do equipamento."})
    }finally{
      if(conn)
        conn.release();
    }
  }



module.exports = { 
    modelAddNewEquipment,
    modelAddNewHistoryEquipment,
    modelAllEquipments,
    modelEquipmentById,
    modelUpdateEquipmentById
};