import mysql from 'serverless-mysql';
import 'dotenv/config';

const {
  MYSQL_HOST,
  MYSQL_DATABSE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PORT,
} = process.env;

const connect = mysql({
  config: {
    host: MYSQL_HOST,
    database: MYSQL_DATABSE,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
  },
});

const db = async ({ query, args }) => {
  let rows;
  try {
    rows = await connect.query(query, args);
    await connect.end();
  } catch (err) {
    console.error(err.message);
  }
  return rows;
};

export default db;
