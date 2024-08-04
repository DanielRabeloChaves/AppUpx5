# Documentação do Back-End: Arquitetura MVC com Node.js

## Visão Geral

Este projeto de back-end utiliza a arquitetura MVC (Model-View-Controller) com Node.js. A arquitetura MVC é uma abordagem de design que separa a aplicação em três componentes principais: Model, View e Controller. Isso facilita a manutenção e escalabilidade do código, permitindo uma clara separação de responsabilidades. Segue padrão de nomenclatura utilizada nas rotas: ```http://localhost:3001/api/exemplo/```.

## Models - Interfaces

Os Models representam a estrutura dos dados e são responsáveis por interagir diretamente com o banco de dados. Eles contêm as definições das entidades e os métodos para acessar e manipular esses dados.

## Controllers

Os Controllers são responsáveis por lidar com as requisições do usuário, contêm a lógica de negócios da aplicação e retornar a resposta apropriada. Eles atuam como intermediários entre as requisições HTTP e os models que que faz o controle com a base de dados.

## Routes

As rotas definem os endpoints da API e associam esses endpoints aos métodos dos Controllers correspondentes.

# Como Rodar a Aplicação BackEnd

1. Instalar as dependências:
```
npm install
```

3. Adicionar o arquivo .env na raiz do projeto do BackEnd

Esse arquivo vai conter as variaveis de ambiente para conexão com banco de dados, chaves de acesso de APIs e Hash de tokens. Segue estrutura desse arquivo:

```
DB_dialect=mysql

DB_host=host
DB_user=user
DB_password=password
DB_database=database
DB_port=3306

Ambient_Dev=true
Ambient_Language=pt-br
```

# Rodar a aplicação:
```
npm start
```

# Estrutura da Pasta

```
dist/
├── controllers/
│ ├── UserController.ts
│ └── ...
├── lang/
│ ├── pt-br.js
│ └── en-un.js
├── models/
│ └── modelUser/
│   ├── User.js
├── routes/
│ ├── userRoutes.js
│ └── ...
├── DataBase/
│ ├── ConfigDB.js
│ └── ...
└── server.js
└── app.js
└── token.js
```

