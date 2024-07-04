//подключение к базе со схемой пользователей
const { Pool } = require('pg');
//наташа
  const pool = new Pool({
      user: 'spiridonovand',
     host: 'localhost',
     database: 'postgres',
      password: 'spinat',
      port: 5432,
 });

//настя
// const pool = new Pool({
// user: 'postgres',
// host: 'localhost',
// database: 'postgres',
// password: 'ahodut22',
// port: 5433,
// });
module.exports = pool;