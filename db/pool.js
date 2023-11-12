const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const port = 3000; 

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, 
  },
});

pool.connect((error, client) => {
  if (error) {
    console.error('Erro ao conectar ao PostgreSQL:', error);
  } else {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL,
        nome VARCHAR(30) NOT NULL,
        matricula int PRIMARY KEY NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        curso VARCHAR(50) NOT NULL
      );
    `;

    client.query(createTableQuery, (error, result) => {
      if (error) {
        console.error('Erro ao criar a tabela "students":', error);
      } else {
        console.log('Tabela "students" criada com sucesso.');
      }
      client.release();
    });
  }
});

module.exports = pool;
