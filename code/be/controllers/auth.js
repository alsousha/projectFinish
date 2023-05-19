import { db } from '../db.js';
import bcrypt from 'bcrypt';

export const register = (req, res) => {
  // console.log('register');
  //check existing user
  const q = 'SELECT * FROM user WHERE email = ? OR username = ?';

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists!');
    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('sdfsdf', salt);

    console.log('QQQQQQQQQQ' + hash);
    const q = 'INSERT INTO user(`username`, `email`,`password`) VALUES (?)';
    const values = ['req.body.username', 'req.body.email', hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created');
    });
  });
};
export const login = (req, res) => {};
export const logout = (req, res) => {};
