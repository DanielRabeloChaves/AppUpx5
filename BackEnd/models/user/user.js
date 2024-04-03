const { ConnectionDB } = require('../../DataBase/Connection');
const { 
    getAllUser,
    insertNewUser,
    getUserByCPF,
    insertNewUserContact,
    getUserByLogin,
    updateUser
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

module.exports = { 
    modelAllUser,
    addNewUser,
    modelUserByCPF,
    addNewContactUserUser,
    updateUserById,
    modelUserByUserLogin
};