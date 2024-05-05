const { ConnectionDB } = require('../../DataBase/Connection');
const { 
    updateImageEquipment
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

module.exports = { 
    modelInsertEquipmentFile
 };
 