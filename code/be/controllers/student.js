import { db } from '../db.js';

export const getStudentClassLevel = (req, res) => {
  const { id } = req.params;
  const q = 'SELECT class_level FROM student WHERE id_user = ?';
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json('User not found');
    }
    const classLevel = data[0].class_level;
    res.status(200).json({ classLevel });
  });
};

export const getStudentSbjs = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id } = req.params;
  // console.log(id);
  const q = `
	SELECT DISTINCT subj.id_subject, subj.subject_name
	FROM student_class sc
	JOIN taskfolder tf ON sc.id_class = tf.id_class
	JOIN subject subj ON tf.id_subject = subj.id_subject
	WHERE sc.id_user = ?
	
	`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Subjects not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
export const getTasksFoldersBySubject = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  // console.log(id);
  const q = `
		SELECT id_tskFolder, tskFolder_name
		FROM taskfolder 
		WHERE is_publish=1 and id_subject = ?
	`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Folders not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
export const getTasksByFolder = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  console.log(id);
  const q = `
  SELECT task.id_task, task.task_name, task.is_done
  FROM task
  JOIN task_tasksfolder ON task.id_task = task_tasksfolder.id_task
  WHERE task_tasksfolder.id_tskFolder = ?
`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Tasks not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
export const getAllTasks = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const q = `SELECT  tsk.*, c.category_name, t.template_name, s.id_subject, s.subject_name
		FROM task tsk 
		JOIN category c ON tsk.id_category = c.id_category
		JOIN template t ON tsk.id_template = t.id_template
		JOIN subject s ON c.id_subject = s.id_subject
	`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json('Tasks not found');
    }
    // console.log(data);
    // Send the class level as the response
    res.status(200).json(data);
  });
};
export const getHWByStudent = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  console.log(id);
  const q = `
  SELECT t.id_task, t.task_name
  FROM student_task st
  JOIN task t ON st.id_task = t.id_task
  WHERE st.is_task_done=0 and st.id_user = ?
`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Tasks not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
