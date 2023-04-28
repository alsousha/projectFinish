//Function that connect to DB(phpMyAdmin) and attempt to show all teachers

const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Get all teachers
app.get("", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * from user Where role = 'teacher' ", (err, rows) => {
      connection.release(); // return the connection to pool

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }

      // if(err) throw err
      console.log("The data from user table are: \n", rows);
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
