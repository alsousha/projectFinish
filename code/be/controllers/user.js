import { db } from '../db.js';

export const updateUser = (req, res) => {
  console.log(req.body);
  // console.log('update user');
  const { id } = req.params;
  const { name, email, lastname } = req.body;
  const q = 'UPDATE user SET name = ?, email = ?, lastname = ? WHERE id_user = ?';

  // // Assuming you are using the mysql2 library for MySQL operations
  db.query(q, [name, email, lastname, id], (error) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
};
