import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import { API_URL } from '../../fe/src/constans.js';

export const register = (req, res) => {
  // console.log('register');
  //check existing user
  const q = 'SELECT * FROM user WHERE email = ? OR username = ?';
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists!');
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = 'INSERT INTO user(`username`, `email`,`password`) VALUES (?)';
    const values = [req.body.username, req.body.email, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created');
    });
  });
};
export const login = (req, res) => {
  // console.log(req.body.email); //email from fe input
  const q = 'SELECT * FROM user WHERE username = ?';
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
export const logout = (req, res) => {
  console.log('sdf');
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('USer has been logged out.');
};
