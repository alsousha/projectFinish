const mysql = require('mysql');

const pool = mysql.createPool({
  host: "localhost",
  user: "",
  password: "",
  database: "test",
  connectionLimit: 10, 
});

function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        reject(error);
        return;
      }

      connection.query(query, values, (err, results) => {
        connection.release();

        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
}
