const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../token');
const { sendEmail } = require('../Email/email')
const { messagesEmail } = require('../lang/pt-br');
const { 
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
 } = require('../models/user/user');
 const moment = require('moment-timezone');
 moment.tz.setDefault('America/Sao_Paulo');
 
function generateTokenLogin(length) {
  try{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
  
    return token;
  }catch{
    throw new Error('Erro ao gerar token de login.'); 
  }
}

async function getAllUserController(req, res, next){
    try{
      // const token = req?.headers?.authorization?.replace(/Bearer /gi, '');
      // const decryptToken = jwt.verify(token, secretKey);
      // if (decryptToken.type_access_user_id != 1) // ADMIN
      //   return res.status(200).json({ error: "Acesso negado." });

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
      if(!data.login || !data.password || !data.cpf || !data.email || !data.phone || !data.confirm_passowrd)
        return res.status(200).json({ error: "Necessario inserir todas as informaçõe." });

      const getUser = await modelUserByCPF(data.cpf);
      if(getUser)
        return res.status(200).json({ error: "Usuario com esse CPF ja cadastrado no sistema."});

      let verifyFormatPassword = verifyPassword(data.password)
      if(!verifyFormatPassword)
        return res.status(200).json({ error: "Senha no formato incorreto."});
         
      if(data.password != data.confirm_passowrd)
        return res.status(200).json({ error: "Nova Senha e Confirma Nova Senha devem estar no mesmo formato."});
              
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword
      const [user] = await addNewUser(data);
      if (user.affectedRows == 0)
        return res.status(401).json({ error: "Erro ao criar novo usuario."});

      data.user_id = user.insertId
      const user_contact = await addNewContactUserUser(data)
      if(user_contact.affectedRows == 0)
        return res.status(401).json({ error: "Erro ao criar dados de contato do usuario."});
      
      res.status(200).json({menssage: "Usuario criado com sucesso.", status: "Sucesso"});
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

        if(!req.body.loginToken){
          const LoginToken = generateTokenLogin(5);
          let insertTokenDB = addLoginToken(LoginToken, user);
          if (insertTokenDB.affectedRows == 0)
            return res.status(401).json({ error: "Erro ao gerar token" });

          const dataEmail = {
            to: user.email, // list of receivers
            subject: messagesEmail.assuntoTokenLogin, // Subject line
            html: messagesEmail.bodyTokenLogin(user.name, user.email, LoginToken), // html body
          }
          const resultSendEmail = await sendEmail(dataEmail);
          if(resultSendEmail.error)
            return res.status(401).json({error: resultSendEmail.error});
          
          return res.status(200).json({menssage: `Token de acesso enviado para o email ${user.email}`, status: "Email Enviado"});
        }
        
        console.log("Chegou aqui")
        console.log(req.body)
        const verifyToken = await getLoginToken(req.body.loginToken, user.id);
        console.log(verifyToken)
        const deleteToken = await deleteLoginToken(user.id)
        console.log(deleteToken)
        if (deleteToken.affectedRows == 0)
          return res.status(404).json({ error:"Erro ao deletar token."});

        if (!verifyToken)
          return res.status(200).json({ error: "Token de acesso invalido."});

        const expiration_token = new Date(verifyToken.expired_date);
        const today = new Date();
        console.log(expiration_token)
        console.log(today)
        if(today > expiration_token)
          return res.status(200).json({ error:"Token de acesso expirado."});
        
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
        return res.status(200).json({menssage: "Login efetuado com sucesso.", token: token, status: "Sucesso"});
  } catch (err) {
    return res.status(401).json({ error: "Erro ao realizar login." });
  }
}

async function forgetPasswordController(req, res, next) {
  try {
    let data = req.body
    if(!data.login)
      return res.status(200).json({ error: "Necessario preencher usuario." });

    const user = await modelUserByUserLogin(data.login);
    if(!user)
      return res.status(200).json({ error: "Login incorreto." });

    if(!data.loginToken){
      const LoginToken = generateTokenLogin(5);
      let insertTokenDB = addLoginToken(LoginToken, user);
      if (insertTokenDB.affectedRows == 0)
        return res.status(401).json({ error: "Erro ao gerar token" });

      const dataEmail = {
        to: user.email, // list of receivers
        subject: messagesEmail.assuntoTokenLogin, // Subject line
        html: messagesEmail.bodyTokenLogin(user.name, user.email, LoginToken), // html body
      }
      const resultSendEmail = await sendEmail(dataEmail);
      if(resultSendEmail.error)
        return res.status(401).json({error: resultSendEmail.error});
      
      return res.status(200).json({menssage: `Token de recuperação de senha enviado para o email ${user.email}`, status: "Email Enviado"});
    }

    const verifyToken = await getLoginToken(data.loginToken, user.id);
    if (!verifyToken){
      const deleteToken = await deleteLoginToken(user.id)
      if (deleteToken.affectedRows == 0)
        return res.status(404).json({ error:"Erro ao deletar token."});
      return res.status(200).json({ error: "Token de acesso invalido."});
    }
      
    const expiration_token = new Date(verifyToken.expired_date);
    const today = new Date();
    if(today > expiration_token){
      const deleteToken = await deleteLoginToken(user.id)
      if (deleteToken.affectedRows == 0)
        return res.status(404).json({ error:"Erro ao deletar token."});
      return res.status(200).json({ error:"Token de acesso expirado."});
    }
      
    if(user.user_bloqued == 1)
      return res.status(200).json({ error: "Usuario bloqueado." });

    if(!data.password || !data.confirm_passowrd)
      return res.status(200).json({ error: "Necessario preencher todos os campos.", status:"Preencher Campos" });

    let verifyFormatPassword = verifyPassword(data.password)
    if(!verifyFormatPassword)
      return res.status(200).json({ error: "Senha no formato incorreto."});

    if(data.password != data.confirm_passowrd)
      return res.status(200).json({ error: "Nova Senha e Confirma Nova Senha devem estar no mesmo formato."});
 
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const resultNewPassword = await newPassword(hashedPassword, user.id);
    if (resultNewPassword.affectedRows == 0)
      return res.status(401).json({ error: "Erro ao criar nova senha."});
      
    const deleteToken = await deleteLoginToken(user.id)
    if (deleteToken.affectedRows == 0)
      return res.status(404).json({ error:"Erro ao deletar token."});

    res.status(200).json({menssage: "Senha atualizada com sucesso.", status: "Sucesso"});     
  } catch (err) {
    console.log(err)
    return res.status(409).json({ error: "Erro ao atualizar senha."});
  }
}

module.exports = { 
    getAllUserController,
    addNewUserController,
    authenticationController,
    forgetPasswordController
};