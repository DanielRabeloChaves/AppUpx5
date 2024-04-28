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
    conn = await ConnectionDB.getConnection();
    try{
      const [user] = await conn.execute(getAllUser);
      return user;
    }catch(err){
      console.log({menssage: "Erro ao buscar lista de usuarios"})
    }finally{
      if(conn)
        conn.release();
    }
}

async function modelUserByCPF(CPF){
  conn = await ConnectionDB.getConnection();
  try{
    const [[user]] = await conn.execute(getUserByCPF, [CPF]);
    return user;
  }catch(err){
    console.log({menssage: "Erro ao buscar usuario por CPF"})
  }finally{
    if(conn)
      conn.release();
  }
}

async function modelUserByUserLogin(login){
  conn = await ConnectionDB.getConnection();
  try{
    const [[user]] = await conn.execute(getUserByLogin, [login]);
    return user;
  }catch(err){
    console.log({menssage: "Erro ao buscar usuario por login"})
  }finally{
    if(conn)
      conn.release();
  }
}

async function addNewUser(user){
  conn = await ConnectionDB.getConnection();
  try{
    const data = {
      name: user.name,
      cpf: user.cpf,
      password: user.password,
      login: user.login
    }
    const User = await conn.execute(insertNewUser, Object.values(data));
    return User;
  }catch(err){
    console.log({menssage: "Erro ao adicionar novo usuario"})
  }finally{
    if(conn)
      conn.release();
  }
}

async function updateUserById(data){
  conn = await ConnectionDB.getConnection();
  try{
    const [User] = await conn.query(updateUser(data), Object.values(data));
    return User;
  }catch(err){
    console.log({menssage: "Erro ao atualizar dados do usuario"})
  }finally{
    if(conn)
      conn.release();
  }
}

async function addNewContactUserUser(user){
  conn = await ConnectionDB.getConnection();
  try{
    const data = {
      user_id: user.user_id,
      email: user.email,
      phone: user.phone
    }
    const User = await conn.execute(insertNewUserContact, Object.values(data));
    return User;
  }catch(err){
    console.log({menssage: "Erro ao adicionar dados de contato do usuario"})
  }finally{
    if(conn)
      conn.release();
  }
}

async function addLoginToken(loginToken, user){
  conn = await ConnectionDB.getConnection();
  try{
    const dataToken = {
      user_id: user.id,
      login: user.login,
      token: loginToken
    }
    const token = await conn.execute(insertTokenLogin, Object.values(dataToken));
    return token;
  }catch(err){
    console.log("Erro ao adicionar token de acesso na base de dados.")
    console.log(err)
  }finally{
    if(conn)
      conn.release();
  }
}

async function getLoginToken(loginToken, userId) {
  conn = await ConnectionDB.getConnection();
  try{
    const [[token]] = await conn.execute(queryGetLoginToken, [loginToken, userId]);
    return token;
  }catch(err){
    console.log("Erro ao buscar token do usuario.")
    console.log(err)
  }finally{
    if(conn)
      conn.release();
  }
}

async function deleteLoginToken(userId) {
  conn = await ConnectionDB.getConnection();
  try{
    const token = await conn.query(queryDeleteLoginToken, [userId]);
    return token;
  }catch(err){
    console.log("Erro ao deletar historico de tokens desse usuario.")
    console.log(err)
  }finally{
    if(conn)
      conn.release();
  }
}

async function newPassword(userPassword, userId){
  conn = await ConnectionDB.getConnection();
  try{
    const dataUser = {
      password: userPassword,
      user_id: userId
    }
    const update = await conn.execute(updatePassword, Object.values(dataUser));
    return update;
  }catch(err){
    console.log("Erro ao criar uma nova senha")
    console.log(err)
  }finally{
    if(conn)
      conn.release();
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