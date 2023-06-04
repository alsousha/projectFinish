import { db } from '../db.js';

export const getSbjs = (req, res) => {
  const q = 'SELECT * FROM subject';

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};
export const getTeacherSbjs = (req, res) => {
  const q = `SELECT t2.subject_name
	FROM teacher_sbjs t1
	JOIN subject t2 ON t1.id_subject = t2.id_subject
	WHERE t1.id_user = ?`;
  // const q = 'SELECT id_subject FROM `teacher_sbjs` WHERE id_user = ?';

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).send(err);
    const teacherSbjs = data.map((row) => row.subject_name); //array that contain only subjects
    return res.status(200).json(teacherSbjs);
  });
};

//return subject's ids by subject's name
export const getSbjsIdBySbjsName = (subject_names) => {
  return new Promise((resolve, reject) => {
    const q = 'SELECT id_subject FROM subject WHERE subject_name IN (?)';
    const values = [subject_names];
    db.query(q, values, (error, results) => {
      if (error) {
        console.error('Error retrieving data:', error);
        reject(error);
      } else {
        const ids = results.map((row) => row.id_subject);
        console.log('IDs:', ids);
        resolve(ids);
      }
    });
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
