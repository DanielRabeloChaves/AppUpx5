const updateImageEquipment = `UPDATE equipment SET photo = ?, edit_date = NOW() WHERE id = ?;`

module.exports = { 
    updateImageEquipment
};