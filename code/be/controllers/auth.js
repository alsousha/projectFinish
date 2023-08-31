// import { db } from '../db.js';
import { dbSingleton } from '../dbSingleton.js';
// import DatabaseSingleton from '../dbSingleton.js'; // Import the class

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getSbjsIdBySbjsName } from './sbj.js';
// import { API_URL } from '../../fe/src/constans.js';

export const register = (req, res) => {
  //check existing user
  const q = 'SELECT * FROM user WHERE email = ? ';
  const db = dbSingleton.getInstance();
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists!');

    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //insert data to user's table
    const q2 = 'INSERT INTO user(`role`,`email`,`password`,`name`,`lastname`,`img_url`) VALUES (?)';
    const values = [
      req.body.role,
      req.body.email,
      hash,
      req.body.name,
      req.body.lastname,
      req.body.img_url,
    ];

    db.query(q2, [values], (err, data) => {
      if (err) return res.json(err);

      const userId = data.insertId;
      const role = req.body.role;

      if (role === 'teacher') {
        //insert data to teacher table
        const insertTeacher = 'INSERT INTO `teacher`(`id_user`) VALUE (?)';
        // console.log(userId);
        db.query(insertTeacher, userId, (err, data) => {
          if (err) return res.json(err);

          //insert data to teacher_sbjs table
          insertTeacherSubjects(userId, req.body.sbjs, req, res);
          // res.status(200).json('Teacher registered successfully!');
        });
      } else if (role === 'student') {
        //insert data to student table
        const insertTeacher = 'INSERT INTO `student`(`id_user`, `class_level`) VALUES (?, ?)';
        // console.log(userId);
        console.log(req.body.class_level);
        db.query(insertTeacher, [userId, req.body.class_level], (err, data) => {
          if (err) return res.status(500).json(err);
          res.status(200).json('Student registered successfully!');
        });
      }
    });
  });
};

const insertTeacherSubjects = async (id_user, subjects_names, req, res) => {
  try {
    // Insert new sbjs for the given id_user and id_subjects
    const subjects_ids = await getSbjsIdBySbjsName(subjects_names); // reverse sbj's names to sbj's id
    await insertCheckedSbjsInTeacher_sbjs(id_user, subjects_ids, req, res);
    console.log('Table updated successfully');
  } catch (error) {
    console.error('Error updating table:', error);
  }
};
const insertCheckedSbjsInTeacher_sbjs = async (id_user, subjects_ids, req, res) => {
  const q = 'INSERT INTO  teacher_sbjs (`id_user`, `id_subject`) VALUES ?';
  const values = subjects_ids.map((id_subject) => [id_user, id_subject]);

  // console.log('values' + values);
  const db = dbSingleton.getInstance();
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json('Teacher registered successfully!');
  });
};
//Function to Register new user
export const register2 = (req, res) => {
  const selectQuery = 'SELECT * FROM user WHERE email = ?';
  const userValues = [req.body.username, req.body.lastname, req.body.role, req.body.email];

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
          res.status(409).json('User already exists!');
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      userValues.push(hash);

      const userQuery =
        'INSERT INTO user (`name`, `lastName`, `role`, `email`, `password`) VALUES (?)';

      db.query(userQuery, [userValues], (err, userResult) => {
        if (err) {
          return db.rollback(() => {
            res.json(err);
            // res.status(200).json('Teacher registered successfully!');
          });
        }

        const userId = userResult.insertId;
        const role = req.body.role;

        if (role === 'teacher') {
          const teacherValues = [userId];
          const teacherQuery = 'INSERT INTO teacher (id_user) VALUES (?)';

          db.query(teacherQuery, [teacherValues], (err, teacherResult) => {
            if (err) {
              return db.rollback(() => {
                res.json(err);
              });
            }

            const idSubjects = req.body.idSubjects || [];
            if (idSubjects.length === 0) {
              return db.rollback(() => {
                res.json('Please provide at least one subject for the teacher.');
              });
            }

            const teacherSubjValues = idSubjects.map((idSubject) => [userId, idSubject]);
            const teacherSubjQuery = 'INSERT INTO teacher_sbjs (id_user, id_subject) VALUES ?';

            db.query(teacherSubjQuery, [teacherSubjValues], (err, teacherSubjResult) => {
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

                res.status(200).json('Teacher registered successfully!');
              });
            });
          });
        } else if (role === 'student') {
          const classLevel = req.body.classLevel;
          let studentValues = [[userId, classLevel]];
          const studentQuery = 'INSERT INTO student (id_user, class_level) VALUES (?, ?)';

          db.query(studentQuery, studentValues, (err, studentResult) => {
            if (err) {
              return db.rollback(() => {
                res.json(err);
              });
            }

            const idClass = req.body.idClass;
            const studentClassValues = [userId, idClass];
            const studentClassQuery = 'INSERT INTO student_class (id_user) VALUES (?)';

            db.query(studentClassQuery, [studentClassValues], (err, studentClassResult) => {
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
                res.status(200).json('Student registered successfully!');
              });
            });
          });
        } else {
          return db.rollback(() => {
            res.status(400).json('Invalid role!');
          });
        }
      });
    });
  });
};
//http://localhost:8800/api/auth/login
export const login = (req, res) => {
  // console.log(req.body.email); //email from fe input
  const q = 'SELECT * FROM user WHERE email = ?';
  console.log('login');
  const db = dbSingleton.getInstance();
  // console.log(db);
  db.query(q, [req.body.email], (err, data) => {
    console.log('in db');
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    //check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json('Wrong username or password');

    const token = jwt.sign({ id: data[0].id }, 'jwtkey'); //create token with secret "jwtkey"

    const { password, ...other } = data[0]; //data[0] - data from db. separate password and other user data

    res
      .cookie('access_token', token, {
        httpOnly: true, //can't to be change in browser
      })
      .status(200)
      .json(other); //set data in tab Response(Network), without password
  });
};

export const deleteUser = (req, res) => {
  // console.log('delete1');
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    console.log('into jwt');
    // console.log(req.data);
    const userId = req.params.id;
    console.log(userId);
    const q = 'DELETE FROM user WHERE `id_user` = ?';

    const db = dbSingleton.getInstance();
    db.query(q, userId, (err, data) => {
      if (err) return res.status(403).json('You can delete only your account!');

      return res.json('User has been deleted!');
    });
  });

  // console.log(token);
  // // SQL query to delete the user
  const q = 'DELETE FROM user WHERE id = ?';

  // // Execute the query with the user ID parameter
  // connection.query(query, [userId], (err, result) => {
  //   // Release the connection back to the pool
  //   connection.release();

  //   if (err) {
  //     callback(err);
  //     return;
  //   }

  //   // Pass the result to the callback function
  //   callback(null, result);
  // });
  // res
  //   .clearCookie('access_token', {
  //     sameSite: 'none',
  //     secure: true,
  //   })
  //   .status(200)
  //   .json('User has been deleted.');
};
export const logout = (req, res) => {
  console.log('logout');
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};
