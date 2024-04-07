const { ConnectionDB } = require('../../DataBase/Connection');
const { 
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
  } = require('./query');

async function modelAllUser(){
    try{
      conn = await ConnectionDB.getConnection();
      const [user] = await conn.execute(getAllUser);
      conn.release();
      return user;
    }catch(err){
      console.log({menssage: "Erro ao buscar lista de usuarios"})
    }
}

async function modelUserByCPF(CPF){
  try{
    conn = await ConnectionDB.getConnection();
    const [[user]] = await conn.execute(getUserByCPF, [CPF]);
    conn.release();
    return user;
  }catch(err){
    console.log({menssage: "Erro ao buscar usuario por CPF"})
  }
}

async function modelUserByUserLogin(login){
  try{
    conn = await ConnectionDB.getConnection();
    const [[user]] = await conn.execute(getUserByLogin, [login]);
    conn.release();
    return user;
  }catch(err){
    console.log({menssage: "Erro ao buscar usuario por login"})
  }
}

async function addNewUser(user){
  try{
    conn = await ConnectionDB.getConnection();
    const data = {
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      login: user.login
    }
    const User = await conn.execute(insertNewUser, Object.values(data));
    conn.release();
    return User;
  }catch(err){
    console.log({menssage: "Erro ao adicionar novo usuario"})
  }
}

async function updateUserById(data){
  try{
    conn = await ConnectionDB.getConnection();
    const [User] = await conn.query(updateUser(data), Object.values(data));
    conn.release();
    return User;
  }catch(err){
    console.log({menssage: "Erro ao atualizar dados do usuario"})
  }
}

async function addNewContactUserUser(user){
  try{
    conn = await ConnectionDB.getConnection();
    const data = {
      user_id: user.user_id,
      email: user.email,
      phone: user.phone
    }
    const User = await conn.execute(insertNewUserContact, Object.values(data));
    conn.release();
    return User;
  }catch(err){
    console.log({menssage: "Erro ao adicionar dados de contato do usuario"})
  }
}

async function addLoginToken(loginToken, user){
  try{
    conn = await ConnectionDB.getConnection();
    const dataToken = {
      user_id: user.id,
      login: user.login,
      token: loginToken
    }
    const token = await conn.execute(insertTokenLogin, Object.values(dataToken));
    conn.release();
    return token;
  }catch(err){
    console.log("Erro ao adicionar token de acesso na base de dados.")
    console.log(err)
  }
}

async function getLoginToken(loginToken, userId) {
  try{
    conn = await ConnectionDB.getConnection();
    const [[token]] = await conn.execute(queryGetLoginToken, [loginToken, userId]);
    conn.release(); 
    return token;
  }catch(err){
    console.log("Erro ao buscar token do usuario.")
    console.log(err)
  }
}

async function deleteLoginToken(userId) {
  try{
    conn = await ConnectionDB.getConnection();
    const token = await conn.query(queryDeleteLoginToken, [userId]);
    conn.release(); 
    return token;
  }catch(err){
    console.log("Erro ao deletar historico de tokens desse usuario.")
    console.log(err)
  }
}

async function newPassword(userPassword, userId){
  try{
    conn = await ConnectionDB.getConnection();
    const dataUser = {
      password: userPassword,
      user_id: userId
    }
    const update = await conn.execute(updatePassword, Object.values(dataUser));
    conn.release();
    return update;
  }catch(err){
    console.log("Erro ao criar uma nova senha")
    console.log(err)
  }
}

module.exports = { 
    modelAllUser,
    addNewUser,
    modelUserByCPF,
    addNewContactUserUser,
    updateUserById,
    modelUserByUserLogin,
    addLoginToken,
    getLoginToken,
    deleteLoginToken,
    newPassword
};