import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { getSbjsIdBySbjsName } from './sbj.js';

export const updateUser = (req, res) => {
  // console.log(req.body);
  // console.log('update user');
  const { id } = req.params;
  const { name, email, lastname, sbjs, lvl, role } = req.body;

  // console.log(sbjs);
  const q = 'UPDATE user SET name = ?, email = ?, lastname = ? WHERE id_user = ?';

  db.query(q, [name, email, lastname, id], (error) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    } else if (role === 'teacher') {
      updateTeacherSubjects(id, sbjs, req, res);
      // res.status(200).json({ message: 'User updated successfully' });
    } else if (role === 'student') {
      updateStudentLvl(id, lvl, req, res);
    } else if (role === 'admin') {
      return res.json('Admin data was been updated.');
    }
  });
};
const updateStudentLvl = async (id_user, lvl, req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const q = 'UPDATE student SET class_level = ? WHERE id_user = ?';
    db.query(q, [lvl, id_user], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Class level was been updated.');
    });
    // console.log('Table updated successfully');
  } catch (error) {
    console.error('Error updating table:', error);
  }
};
// const updateTeacherSubjects = async (id_user, subjects_names, req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json('Not authenticated!');
//   try {
//     // Delete existing entries for the given id_user
//     await deleteSbjsFromTeacher_sbjs(id_user, token);

//     // Insert new sbjs for the given id_user and id_subjects
//     const subjects_ids = await getSbjsIdBySbjsName(subjects_names); // reverse sbj's names to sbj's id
//     await insertCheckedSbjsInTeacher_sbjs(id_user, subjects_ids, req, res, token);

//     console.log('Table updated successfully');
//   } catch (error) {
//     console.error('Error updating table:', error);
//   }
// };
const updateTeacherSubjects = async (id_user, subjects_names, req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    // Delete existing entries for the given id_user
    await deleteSbjsFromTeacher_sbjs(id_user, token);

    // Insert new sbjs for the given id_user and id_subjects
    const subjects_ids = await getSbjsIdBySbjsName(subjects_names); // reverse sbj's names to sbj's id
    await insertCheckedSbjsInTeacher_sbjs(id_user, subjects_ids, req, res, token);

    console.log('Table updated successfully');
  } catch (error) {
    console.error('Error updating table:', error);
  }
};

const deleteSbjsFromTeacher_sbjs = async (id_user, token) => {
  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!');

    return new Promise((resolve, reject) => {
      const q = 'DELETE FROM teacher_sbjs WHERE id_user = ?';
      db.query(q, id_user, (error, results) => {
        if (error) {
          console.error('Error deleteEntriesForUser user', error);
          reject(error);
        } else {
          console.log('User deleteEntriesForUser successfully');
          resolve({ message: 'User deleteEntriesForUser successfully' });
        }
      });
    });
  });
};

const insertCheckedSbjsInTeacher_sbjs = async (id_user, subjects_ids, req, res, token) => {
  jwt.verify(token, 'jwtkey', (err) => {
    if (err) return res.status(403).json('Token is not valid!');

    const q = 'INSERT INTO  teacher_sbjs (`id_user`, `id_subject`) VALUES ?';
    const values = subjects_ids.map((id_subject) => [id_user, id_subject]);

    console.log('values' + values);
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Subjects was been added.');
    });
  });
};

// Function to get the user's password
function getUserPassword(userId, callback) {
  const q = 'SELECT password FROM user WHERE id_user = ?';
  db.query(q, [userId], (err, res) => {
    if (err) {
      console.error('Error retrieving user password:', err);
      return callback(err, null);
    }

    if (res.length === 0) {
      // User not found
      return callback(null, null);
    }

    const password = res[0].password;
    return callback(null, password);
  });
}
export const updateUserPassword = (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  //fetch password from bd
  getUserPassword(id, (err, password) => {
    if (err) {
      console.error('Error:', err);
      // Handle the error
      return;
    }

    if (!password) {
      console.log('User not found');
      return;
    }

    //password was fetching
    // Compare the current password with the stored hashed password
    bcrypt.compare(currentPassword, password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (isMatch) {
        // Passwords match, current password is valid
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        const q = 'UPDATE user SET password = ? WHERE id_user = ?';

        db.query(q, [hash, id], (err, data) => {
          if (err) return res.status(402).json('Something wrong, try later');
          return res.status(200).json('Password has been updated');
        });
      } else {
        // Passwords do not match, current password is invalid
        return res.status(401).json("Current password isn't correct");
      }
    });
  });
};
export const checkToken = (req, res) => {
  const { token } = req.body;
  const secret = 'jwtkey';
  const decodedToken = verifyToken(token, secret);

  if (!decodedToken || isTokenExpired(decodedToken)) {
    // Token is invalid or expired
    return res.status(400).json({ error: 'Invalid or expired token' });
  } else return res.status(200).json('Token is valid');
};
export const updateUserPasswordReset = (req, res) => {
  const { token, newPassword, email } = req.body;
  // console.log(token);

  // const secret = 'jwtkey';
  // const decodedToken = verifyToken(token, secret);

  // if (!decodedToken || isTokenExpired(decodedToken)) {
  //   // Token is invalid or expired
  //   res.status(400).json({ error: 'Invalid or expired token' });
  //   return;
  // }
  // // Passwords match, current password is valid
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);
  const q = 'UPDATE user SET password = ? WHERE email = ?';

  db.query(q, [hash, email], (err, data) => {
    if (err) return res.status(402).json('Something wrong, try later');
    return res.status(200).json('Password has been updated');
  });
};
export const checkPassword = (req, res) => {
  const { currentPassword, id_user } = req.body;
  //fetch password from bd
  getUserPassword(id_user, (err, password) => {
    if (err) {
      console.error('Error:', err);
      // Handle the error
      return;
    }

    if (!password) {
      // User not found
      console.log('User not found');
      return;
    }

    //password was fetching
    // Compare the current password with the stored hashed password
    bcrypt.compare(currentPassword, password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Server error' });
      }

      if (isMatch) {
        // Passwords match, current password is valid
        return res.json({ valid: true });
      } else {
        // Passwords do not match, current password is invalid
        return res.json({ valid: false });
      }
    });

    // console.log('User password:', password);
  });
};
export const resetPassword = (req, res) => {
  console.log('reset');
  const { email } = req.body; // Assuming the email is provided in the request body
  const q = 'SELECT id_user FROM user WHERE email = ?';
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(204).json({ message: 'User not found.' });
    }
    // Generate a secure token
    const token = generateToken(email);
    // console.log(token);

    // Call the sendPasswordResetEmail function with the email and token
    sendPasswordResetEmail(email, token);
    return res.status(200).json({ message: 'Password reset email has been sent.' });
  });
};
export const resetPassword2 = (req, res) => {
  console.log('reset2');
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'jwtkey', { expiresIn: '1h' });
};
const sendPasswordResetEmail = (email, token) => {
  // Your nodemailer configuration and email options remain the same
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adb.kzn@gmail.com',
      pass: 'trjhxbvletsqpelc',
    },
  });

  const mailOptions = {
    from: 'adb.kzn.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>Please click the following link to reset your password:</p>
		<a href="http://localhost:3000/reset-password?token=${token}&email=${email}">Reset Password</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    // Token verification failed
    return null;
  }
};

// Function to check token expiration
const isTokenExpired = (decodedToken) => {
  const currentTime = Date.now() / 1000; // Get current time in seconds
  return decodedToken.exp < currentTime;
};
export const getArticles = (req, res) => {
  const q = 'SELECT * FROM blog';

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
