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

//настя
const pool = new Pool({
    user: 'spinat',
    host: 'slonik.avalon.ru',
    database: 'dbspinat',
    password: 'spinat',
    port: 5433,
});
module.exports = pool;