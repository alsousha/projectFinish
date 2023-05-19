/**
 * file: Registretion for new user
 * After user fill registration form his data added to user table first.
 * After that we check the role of the new user, if it`s student so we add him to the student table too.
 * If it`s teacher we add him to the teacher table and update subject too.
 */
const express = require("express");
const router = express.Router();
const pool = require("./connectionToDB");

router.get("/register", (req, res) => {
  const role = req.query.role;
  const name = req.query.firstname;
  const lastName = req.query.lastname;
  const email = req.query.email;
  const password = req.query.password;
  const subjectName = req.query.subjectName;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred during registration");
      return;
    }

    connection.beginTransaction((err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred during registration");
        return;
      }

      //add new user to user table
      connection.query(
        "INSERT INTO user (role, name, lastName, email, password) VALUES (?, ?, ?, ?, ?)",
        [role, name, lastName, email, password],
        (err, result) => {
          if (err) {
            connection.rollback(() => {
              console.log(err);
              res.status(500).send("Error occurred during registration");
            });
            return;
          }

          const userId = result.insertId;

          //check if the role of the user is teacher, so add his info to teacher table too.
          if (role === "teacher") {
            // Handle teacher registration
            connection.query(
              "INSERT INTO teacher (id_user) VALUES (?)",
              [userId],
              (err) => {
                if (err) {
                  connection.rollback(() => {
                    console.log(err);
                    res.status(500).send("Error occurred during registration");
                  });
                  return;
                }

                connection.commit((err) => {
                  if (err) {
                    connection.rollback(() => {
                      console.log(err);
                      res
                        .status(500)
                        .send("Error occurred during registration");
                    });
                    return;
                  }

                  res.send("Registration successful");
                });
              }
            );
            //check if the role of the user is student, so add his info to student table too.
          } else if (role === "student") {
            // Handle student registration
            connection.query(
              "INSERT INTO student (id_user) VALUES (?)",
              [userId],
              (err) => {
                if (err) {
                  connection.rollback(() => {
                    console.log(err);
                    res.status(500).send("Error occurred during registration");
                  });
                  return;
                }

                connection.commit((err) => {
                  if (err) {
                    connection.rollback(() => {
                      console.log(err);
                      res
                        .status(500)
                        .send("Error occurred during registration");
                    });
                    return;
                  }

                  res.send("Registration successful");
                });
              }
            );
          } else {
            // Invalid role
            connection.rollback(() => {
              res.status(400).send("Invalid role");
            });
          }
        }
      );
    });
  });
});

module.exports = router;
