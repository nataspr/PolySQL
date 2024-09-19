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
// const pool = new Pool({
//     connectionString: 'postgres://n_spiridonova:Lk30!^NVf40@212.233.89.90:5433/postgres'
// });
// const pool = new Pool({
//     user: 'spinat',
//     host: 'slonik.avalon.ru',
//     database: 'dbspinat',
//     password: 'spinat',
//     port: 5433,
// });
module.exports = pool;