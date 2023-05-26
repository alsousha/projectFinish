import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { API_URL } from '../../fe/src/constans.js';

export const register = (req, res) => {
  // console.log('register');
  //check existing user
  const q = 'SELECT * FROM user WHERE email = ? OR name = ?';
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists!');
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log('fdfs' + hash);

    const q = 'INSERT INTO user(`name`,`lastName`,`role`,`email`,`password`) VALUES (?)';
    const values = [req.body.username, req.body.lastname, req.body.role, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created');
    });
  });
};
//http://localhost:8800/api/auth/login
export const login = (req, res) => {
  // console.log(req.body.email); //email from fe input
  const q = 'SELECT * FROM user WHERE name = ?';
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

export const deleteUser = (req, res) => {};
export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};
