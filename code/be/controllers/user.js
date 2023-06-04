import { db } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getSbjsIdBySbjsName } from './sbj.js';

export const updateUser = (req, res) => {
  // console.log(req.body);
  // console.log('update user');
  const { id } = req.params;
  const { name, email, lastname, sbjs } = req.body;

  // console.log(sbjs);
  const q = 'UPDATE user SET name = ?, email = ?, lastname = ? WHERE id_user = ?';

  // // Assuming you are using the mysql2 library for MySQL operations
  db.query(q, [name, email, lastname, id], (error) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    } else {
      updateTeacherSubjects(id, sbjs, req, res);
      // res.status(200).json({ message: 'User updated successfully' });
    }
  });
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
