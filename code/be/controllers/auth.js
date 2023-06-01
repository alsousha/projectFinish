import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { API_URL } from '../../fe/src/constans.js';

export const register = (req, res) => {
  console.log(req);
  // console.log('register');
  //check existing user
  const q = 'SELECT * FROM user WHERE email = ? ';
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists!');
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // console.log('fdfs' + hash);

    const q = 'INSERT INTO user(`name`,`lastname`,`role`,`email`,`password`,`img_url`) VALUES (?)';
    const values = [
      req.body.username,
      req.body.lastname,
      req.body.role,
      req.body.email,
      hash,
      req.body.img_url,
    ];
    // const q2 = 'INSERT INTO teacher(`id_subject`) VALUES (?) WHERE id_user = ?';

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created');
    });

    // const q2 = 'INSERT INTO teacher(`id_user`, `id_subject`) VALUES (?, ?)';
    const q2 = 'UPDATE teacher SET id_subject = ? WHERE id_user = ?';

    // db.query(q, [values], (err, data) => {
    //   if (err) return res.json(err);

    //   const idUser = data.insertId; // Get the inserted id_user

    //   const teacherValues = [
    //     idUser,
    //     // req.body.id_subject, // Assuming you have the id_subject value available
    //     5, // Assuming you have the id_subject value available
    //   ];

    //   db.query(q2, teacherValues, (err, data) => {
    //     if (err) return res.json(err);
    //     return res.status(200).json('User and Teacher have been created');
    //   });
    // });
  });
};
//http://localhost:8800/api/auth/login
export const login = (req, res) => {
  // console.log(req.body.email); //email from fe input
  const q = 'SELECT * FROM user WHERE email = ?';
  db.query(q, [req.body.email], (err, data) => {
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
  console.log('delete');
  // // SQL query to delete the user
  // const q = 'DELETE FROM user WHERE id = ?';

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
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};
