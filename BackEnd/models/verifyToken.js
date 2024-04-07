async function verifyToken(){
    try{
      const Token = {
        "token": true,
        "Menssage": "Token valido"
      }
      return Token;
    }catch(err){
      console.log("Erro ao verificar token")
      console.log(err)
    }
  }
  
  module.exports = { 
    verifyToken
};