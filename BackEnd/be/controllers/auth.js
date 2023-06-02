import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Function to Register new user
export const register = (req, res) => {
  const selectQuery = "SELECT * FROM user WHERE email = ?";
  const userValues = [
    req.body.username,
    req.body.lastname,
    req.body.role,
    req.body.email,
  ];

  // Start the transaction
  db.beginTransaction((err) => {
    if (err) {
      return res.json(err);
    }

    db.query(selectQuery, [req.body.email], (err, data) => {
      if (err) {
        return db.rollback(() => {
          res.json(err);
        });
      }

      if (data.length) {
        return db.rollback(() => {
          res.status(409).json("User already exists!");
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      userValues.push(hash);

      const userQuery =
        "INSERT INTO user (`name`, `lastName`, `role`, `email`, `password`) VALUES (?)";

      db.query(userQuery, [userValues], (err, userResult) => {
        if (err) {
          return db.rollback(() => {
            res.json(err);
          });
        }

        const userId = userResult.insertId;
        const role = req.body.role;

        if (role === "teacher") {
          const teacherValues = [userId];
          const teacherQuery = "INSERT INTO teacher (id_user) VALUES (?)";

          db.query(teacherQuery, [teacherValues], (err, teacherResult) => {
            if (err) {
              return db.rollback(() => {
                res.json(err);
              });
            }

            const idSubjects = req.body.idSubjects || [];
            if (idSubjects.length === 0) {
              return db.rollback(() => {
                res.json(
                  "Please provide at least one subject for the teacher."
                );
              });
            }

            const teacherSubjValues = idSubjects.map((idSubject) => [
              userId,
              idSubject,
            ]);
            const teacherSubjQuery =
              "INSERT INTO teacher_sbjs (id_user, id_subject) VALUES ?";

            db.query(
              teacherSubjQuery,
              [teacherSubjValues],
              (err, teacherSubjResult) => {
                if (err) {
                  return db.rollback(() => {
                    res.json(err);
                  });
                }

                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => {
                      res.json(err);
                    });
                  }

                  res.status(200).json("Teacher registered successfully!");
                });
              }
            );
          });
        } else if (role === "student") {
          const classLevel = req.body.classLevel;
          let studentValues = [[userId, classLevel]];
          const studentQuery =
            "INSERT INTO student (id_user, class_level) VALUES (?, ?)";

          db.query(studentQuery, studentValues, (err, studentResult) => {
            if (err) {
              return db.rollback(() => {
                res.json(err);
              });
            }

            const idClass = req.body.idClass;
            const studentClassValues = [userId, idClass];
            const studentClassQuery =
              "INSERT INTO student_class (id_user) VALUES (?)";

            db.query(
              studentClassQuery,
              [studentClassValues],
              (err, studentClassResult) => {
                if (err) {
                  return db.rollback(() => {
                    res.json(err);
                  });
                }

                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => {
                      res.json(err);
                    });
                  }
                  res.status(200).json("Student registered successfully!");
                });
              }
            );
          });
        } else {
          return db.rollback(() => {
            res.status(400).json("Invalid role!");
          });
        }
      });
    });
  });
};




//Function for login
export const login = (req, res) => {
  // console.log(req.body.email); //email from fe input
  const q = "SELECT * FROM user WHERE name = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, "jwtkey"); //create token with secret "jwtkey"

    const { password, ...other } = data[0]; //data[0] - data from db. separate password and other user data

    res
      .cookie("access_token", token, {
        httpOnly: true, //can't to be change in browser
      })
      .status(200)
      .json(other); //set data in tab Response(Network), without password
  });
};

//Function for logout
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
