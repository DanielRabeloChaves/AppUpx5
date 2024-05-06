const updateImageEquipment = `UPDATE equipment SET photo = ?, edit_date = NOW() WHERE id = ?;`

const queryFileEquipmentById = `SELECT * FROM equipment where id = ?;`

module.exports = { 
    updateImageEquipment,
    queryFileEquipmentById
};