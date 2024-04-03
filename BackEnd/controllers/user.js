const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../token');
const { 
  modelAllUser,
  addNewUser,
  modelUserByCPF,
  addNewContactUserUser,
  updateUserById,
  modelUserByUserLogin
 } = require('../models/user/user');

async function getAllUserController(req, res, next){
    try{
        const user = await modelAllUser();
        if(!user)
          return res.status(200).json({ error: "Não possui usuarios" });
    
        res.status(200).json(user)
    }catch(err){
      return res.status(404).json({ error: "Erro ao buscar usuarios" });
    }
}

function verifyPassword(senha) {
  try{
    if (senha.length < 8)
    return false;
    
    if (!/[A-Z]/.test(senha))
      return false;
  
    if (!/[a-z]/.test(senha))
      return false;
  
    if (!/\d/.test(senha))
      return false;
  
    return true;
  }catch{
    throw new Error('Erro ao formatar codigo do servico.'); 
  }
}

async function addNewUserController(req, res, next) {
  try {
      let data = req.body;
      if(!data.login || !data.password || !data.cpf || !data.email || !data.phone)
        return res.status(200).json({ error: "Necessario inserir todas as informaçõe." });

      const getUser = await modelUserByCPF(data.cpf);
      if(getUser)
        return res.status(200).json({ error: "Usuario com esse CPF ja cadastrado no sistema."});

      let verifyFormatPassword = verifyPassword(data.password)
      if(!verifyFormatPassword)
        return res.status(200).json({ error: "Senha no formato incorreto."});
         
      if(data.password != data.confirm_passowrd)
        return res.status(200).json({ error: "Necessario confirmar sua senha."});
              
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword
      const [user] = await addNewUser(data);
      if (user.affectedRows == 0)
        return res.status(401).json({ error: "Erro ao criar novo usuario."});

      data.user_id = user.insertId
      const user_contact = await addNewContactUserUser(data)
      if(user_contact.affectedRows == 0)
        return res.status(401).json({ error: "Erro ao criar dados de contato do usuario."});
      
      res.status(200).json({menssage: "Usuario criado com sucesso."});
  } catch (err) {
    return res.status(404).json({ error: "Erro ao inserir novo usuario" });
  }
}

async function authenticationController(req, res, next) {
  try {
        if(!req.body.login || !req.body.password)
          return res.status(200).json({ error: "Necessario preencher usuario e senha." });
        
        const user = await modelUserByUserLogin(req.body.login);
        if(!user)
          return res.status(200).json({ error: "Login ou Senha incorreto." });

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordCorrect == false)
          return res.status(200).json({ error: "Login ou Senha incorreto." });

        if(user.user_bloqued == 1)
          return res.status(200).json({ error: "Usuario bloqueado." });

        let updateDataUser = {
          last_access_date: new Date(),
          first_access: 0, 
          id: user.id
        }
        const resultUpdate = await updateUserById(updateDataUser);
        if(resultUpdate.affectedRows == 0)
          return res.status(401).json({ error: "Erro ao atualizar dados de acesso do usuario."});

        const dataUser = {
            id: user.id,
            name: user.name,
            type_access_user_id: user.type_access_user_id,
            cpf: user.cpf,
            login: user.login,
            email: user.email,
            phone: user.phone,
            last_access_date: user.last_access_date,
            create_date: user.create_date
        };
        const token = jwt.sign(dataUser, secretKey, { expiresIn: '8h' });

        res.status(200).json({menssage: "Login efetuado com sucesso.", token: token});
  } catch (err) {
    return res.status(401).json({ error: "Erro ao realizar login." });
  }
}

module.exports = { 
    getAllUserController,
    addNewUserController,
    authenticationController
};