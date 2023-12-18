// Conexão de produção
//const database = "siscopa"

// Conexão de desenvolvimento
const database = "siscopadesenv"

const knex = require('knex')({
    client: 'mssql',
    //version: '7.2',
    connection: {
      host : '192.168.16.39',
      port : 1433,
      user : 'usr_contacopa',
      password : 'copa2023',
      database : database
    }
  });

  module.exports = knex

//teste