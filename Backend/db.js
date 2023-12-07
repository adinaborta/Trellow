const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "trellow",
  password: "password",
  port: "5432",
});

const query = (text, params, callback) => {
  return pool.query(text, params, callback);
};

module.exports = query;
