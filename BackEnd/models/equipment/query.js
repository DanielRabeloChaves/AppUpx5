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

const getAllEquipments = `SELECT * FROM equipment ORDER BY edit_date desc`

const getEquipmentByID = `SELECT * FROM equipment where id = ?`

const getEquipmentHistoryById = `SELECT hist.id,
hist.id_equipment,
hist.id_user,
us.name AS name_user,
us.cpf,
hist.id_sector,
sect.name AS name_sector,
hist.id_status_calibration,
calib.name AS name_status_calibration,
hist.local,
hist.get_equipment,
hist.return_equipment,
hist.edit_date
FROM equipment_history AS hist
INNER JOIN sector AS sect ON sect.id = hist.id_sector
INNER JOIN user AS us ON us.id = hist.id_user
INNER JOIN status_calibration AS calib ON calib.id = hist.id_status_calibration
where id_equipment = ? ORDER BY hist.edit_date desc`

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
    updateEquipment,
    getEquipmentHistoryById
};