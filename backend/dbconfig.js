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
user: 'spilikh',
host: 'osokiebag.beget.app',
database: 'polysql',
password: '50O0*ppTQZNn',
port: 5432,
});
module.exports = pool;