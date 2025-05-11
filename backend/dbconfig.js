require('dotenv').config();

//подключение к базе со схемой пользователей
const { Pool } = require('pg');
//наташа
//   const pool = new Pool({
//       user: 'spiridonovand',
//      host: 'localhost',
//      database: 'postgres',
//       password: 'spinat',
//       port: 5432,
//  });

const pool = new Pool({
    user: process.env.DB_USER || 'spinat',
    host: process.env.DB_HOST || 'slonik.avalon.ru',
    database: process.env.DB_NAME || 'dbspinat',
    password: process.env.DB_PASSWORD || 'spinat',
    port: parseInt(process.env.DB_PORT) || 5433
});
// const pool = new Pool({
//     connectionString: 'postgres://n_spiridonova:Lk30!^NVf40@212.233.89.90:5433/postgres'
// });

// Тестовое подключение (для проверки запросов)
const testPool = new Pool({
  user: process.env.TEST_DB_USER || 'test_user',
  host: process.env.TEST_DB_HOST || 'localhost',
  database: process.env.TEST_DB_NAME || 'test_db',
  password: process.env.TEST_DB_PASSWORD || 'test_password',
  port: parseInt(process.env.TEST_DB_PORT) || 5432
});

module.exports = {pool, testPool} ;