const { ConnectionDB } = require('../../DataBase/Connection');
const { 
    updateImageEquipment,
    queryFileEquipmentById
} = require('./query');

async function modelInsertEquipmentFile(data) {
  conn = await ConnectionDB.getConnection();
  try {
    const files = await conn.query(updateImageEquipment, Object.values(data));
    return files;
  } catch(err) {
    console.log("Erro ao inserir o diretorio da imagem do equipamento no banco");
    console.log(err);
  } finally {
    if (conn)
      conn.release();
  }
}

async function modelGetFileEquipmentById(EquipmentId) {
    conn = await ConnectionDB.getConnection();
    try {
      const [[File]] = await conn.execute(queryFileEquipmentById, [EquipmentId]);
      return File;
    } catch(err) {
      console.log("Erro ao buscar imagem do equipamento.");
      console.log(err);
    } finally {
      if (conn)
        conn.release();
    }
  }

module.exports = { 
    modelInsertEquipmentFile,
    modelGetFileEquipmentById
 };
 