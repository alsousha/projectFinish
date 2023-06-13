import { db } from '../db.js';
export const getTasksByTeacher = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const q = `SELECT  tsk.*, c.category_name, t.template_name, s.id_subject, s.subject_name
					FROM task tsk 
					JOIN category c ON tsk.id_category = c.id_category
					JOIN template t ON tsk.id_template = t.id_template
					JOIN subject s ON c.id_subject = s.id_subject
					WHERE tsk.id_teacher = ?`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(404).json('Tasks not found');
    }
    // console.log(data);
    // Send the class level as the response
    res.status(200).json(data);
  });
};
