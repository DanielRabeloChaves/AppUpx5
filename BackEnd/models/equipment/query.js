const insertNewEquipment = `INSERT INTO equipment (name,
    description,
    create_date, 
    edit_date)
    VALUE (?, ?, NOW(), NOW())`;

const insertNewHistoryEquipment = `INSERT INTO equipment_history (id_equipment,
    id_user,
    id_sector, 
    id_status_calibration, 
    local,
    get_equipment,
    return_equipment,
    edit_date)
    VALUE (?, ?, ?, ?, ?, ?, ?, NOW())`;

const getAllEquipments = `SELECT * FROM equipment ORDER BY name`

const getEquipmentByID = `SELECT * FROM equipment where id = ?`

const updateEquipment = (obj)=> {
    const query = [];
    Object.keys(obj).map(item =>{
        if(item != "id" && item != "edit_date" && item != "create_date")
            query.push(`${item} = ?`);
        return item;
    })

    return `UPDATE equipment SET ${query.join(',')} WHERE id = ${obj.id}`;
}

module.exports = { 
    insertNewEquipment,
    insertNewHistoryEquipment,
    getAllEquipments,
    getEquipmentByID,
    updateEquipment
};