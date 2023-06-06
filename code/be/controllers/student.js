import { db } from '../db.js';

export const getStudentClassLevel = (req, res) => {
  const { id } = req.params;
  const q = 'SELECT class_level FROM student WHERE id_user = ?';
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(404).json('User not found');
    }
    const classLevel = data[0].class_level;
    // Send the class level as the response
    res.status(200).json({ classLevel });
  });
};
