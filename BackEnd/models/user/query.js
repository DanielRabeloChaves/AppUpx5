const getAllUser = `SELECT id, type_access_user_id, name FROM user`;

const insertNewUser = `INSERT INTO user (name,
    type_access_user_id,
    cpf, 
    password, 
    login)
    VALUE (?, 1, ?, ?, ?)`;

const insertNewUserContact = `INSERT INTO contact_user (user_id,
    email,
    phone)
    VALUE (?, ?, ?)`;

const getUserByCPF = `SELECT id, name from user WHERE cpf = ?`;

const getUserByLogin = `SELECT us.id,
us.type_access_user_id,
us.name,
us.cpf,
us.password,
us.login,
us.first_access,
us.last_access_date,
us.create_date,
us.user_bloqued,
cont.email,
cont.phone from user AS us 
INNER JOIN contact_user AS cont ON cont.user_id = us.id WHERE login = ?`;

const updateUser = (obj)=> {
    const query = [];
    Object.keys(obj).map(item =>{
        if(item != "id")
            query.push(`${item} = ?`);
        return item;
    })

    return `UPDATE user SET ${query.join(',')} WHERE id = ${obj.id}`;
}
const insertTokenLogin = `INSERT INTO login_token (user_id, 
    login,  
    token,
    create_date,
    expired_date)
    VALUE (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 15 MINUTE))`;
const queryGetLoginToken = `SELECT * FROM login_token WHERE token = ? AND user_id = ?`;
const queryDeleteLoginToken = `DELETE FROM login_token WHERE user_id = ?`;
const updatePassword= `UPDATE user SET password = ? WHERE id = ?`;

module.exports = { 
    getAllUser,
    insertNewUser,
    getUserByCPF,
    insertNewUserContact,
    getUserByLogin,
    updateUser,
    insertTokenLogin,
    queryGetLoginToken,
    queryDeleteLoginToken,
    updatePassword
};