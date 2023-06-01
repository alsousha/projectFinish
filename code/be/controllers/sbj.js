import { db } from '../db.js';

export const getSbjs = (req, res) => {
  const q = 'SELECT * FROM subject';

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
export const updateTeacherSubject = (req, res) => {
  const { id } = req.params;
  const q = 'UPDATE teacher SET id_subject = ? WHERE id_user = ?';
  // console.log(req.body.option_id);
  // console.log(id);
  db.query(q, [req.body.option_id, id], (error) => {
    if (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  });
};
