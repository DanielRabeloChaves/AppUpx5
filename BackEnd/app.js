const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((req, res, next)=>{
    try{
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
         'Access-Control-Allow-Header',
         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
         );
    
         if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).send({});
         }
         next();
    }catch{
        return res.status(405).json({ error: "Erro: Método Invalido."});
    }
})

const routerUser = require('./routes/user') 
const routerVerifyToken = require('./routes/verifyToken')
const routerEquipment = require('./routes/equipment') 

try{
    app.use('/api/user', routerUser);    
    app.use('/api/verifytoken', routerVerifyToken);
    app.use('/api/equipment', routerEquipment);
}catch{
    throw new Error('Erro ao executar as rotas.'); 
}

app.use((req, res, next) => {
    try{
        const erro = new Error("Falha ao conectar no Banco de Dados")
        erro.status = 404
        next(erro)
    }catch{
        return res.status(405).json({ error: "Falha ao conectar no Banco de Dados"});
    }
})

app.use((error, req, res, next) =>{
    try{
        res.status(error.status || 500);
        return res.send({
            erro:{
                mensagem: error.message
            }
        })
    }catch{
        return res.status(405).json({ error: "Falha ao conectar no Banco de Dados"});
    }
})

module.exports = app;