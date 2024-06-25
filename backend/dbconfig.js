//подключение к базе со схемой пользователей
const { Pool } = require('pg');

const pool = new Pool({
    user: 'spiridonovand',
    host: 'localhost',
    database: 'postgres',
    password: 'spinat',
    port: 5432,
});

module.exports = pool;