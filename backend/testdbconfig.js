require('dotenv').config();

const { Pool } = require('pg');

// Тестовое подключение (для проверки запросов)
const testPool = new Pool({
  user: process.env.TEST_DB_USER || 'test_user',
  host: process.env.TEST_DB_HOST || 'localhost',
  database: process.env.TEST_DB_NAME || 'test_db',
  password: process.env.TEST_DB_PASSWORD || 'test_password',
  port: parseInt(process.env.TEST_DB_PORT) || 5432
});

module.exports = testPool;