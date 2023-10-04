import mysql from 'mysql2/promise';

/*
const db = await mysql.createConnection({
  host: 'localhost',
  port: '3306',
  password: '11yenaro11',
  user: 'root',
  database: 'tictactoe',
});
    const db = await mysql.createConnection({
      host: 'containers-us-west-99.railway.app',
      port: '7639',
      password: '5KQu9q4CNBuBkruCb1Rx',
      user: 'root',
      database: 'railway',
    });

*/
/*
const connectDB = async ({ query, values }) => {
  try {
    const result = await db.query(query, values);
    await db.end();
    return result;
  } catch (err) {
    console.error('error de db', err);
    throw new Error(err.message);
  }
};

db.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});
db.execute(
  'SELECT * FROM users',
  [],
  (err, results, fields) => {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available

    // If you execute same statement again, it will be picked from a LRU cache
    // which will save query preparation time and give better performance
  },
); */
const connectDB = async ({ query, values }) => {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      port: '3306',
      password: '11yenaro11',
      user: 'root',
      database: 'tictactoe',
    });
    const [rows] = await db.execute(query);
    await db.end();
    return rows;
  } catch (err) {
    console.error('error de db', err);
    throw new Error(err.message);
  }
};
export default connectDB;
