// import { db } from '../db.js';
import { dbSingleton } from '../dbSingleton.js';
// import DatabaseSingleton from '../dbSingleton.js'; // Import the class

export const getStudentData = (req, res) => {
  const { id } = req.params;
  const q = 'SELECT class_level, total_points FROM student WHERE id_user = ?';
  const db = dbSingleton.getInstance();
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json('User not found');
    }
    // const classLevel = data[0].class_level;
    // console.log(data);
    res.status(200).json(data[0]);
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
  const db = dbSingleton.getInstance();
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Subjects not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
export const getStudentClassBySbj = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id } = req.params;
  const { sbjId } = req.body;
  // console.log(id);
  const q = `
		SELECT
			c.id_class,
			c.class_name
		FROM
			student_class sc
		JOIN
			class c ON sc.id_class = c.id_class
		JOIN
			teacher_sbjs ts ON c.id_teacher = ts.id_user
		WHERE
			sc.id_user = ?
			AND ts.id_subject = ?
		LIMIT 1;
		
	`;
  const db = dbSingleton.getInstance();
  db.query(q, [id, sbjId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Subjects not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};

export const getTasksFoldersBySbjAndClass = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const { studentClass } = req.body;
  // console.log(studentClass);
  // console.log(id);
  const q = `
		SELECT id_tskFolder, tskFolder_name
		FROM taskfolder 
		WHERE is_publish=1 and id_subject = ? and id_class = ?
	`;
  const db = dbSingleton.getInstance();
  db.query(q, [id, studentClass], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Folders not found');
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
  const db = dbSingleton.getInstance();
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
  const { id_user } = req.body;
  // console.log(id);
  const q = `
  SELECT task.*, c.category_name, s.subject_name, st.is_task_done
  FROM task
	JOIN category c ON task.id_category = c.id_category
	JOIN subject s ON c.id_subject = s.id_subject
	JOIN student_task st ON task.id_task = st.id_task and st.id_user = ?
  JOIN task_tasksfolder ON task.id_task = task_tasksfolder.id_task
  WHERE task_tasksfolder.id_tskFolder = ?
`;
  const db = dbSingleton.getInstance();
  db.query(q, [id_user, id], (err, data) => {
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
  const db = dbSingleton.getInstance();
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
  SELECT t.*, c.category_name, s.subject_name
	FROM student_task st
	JOIN task t ON st.id_task = t.id_task
	JOIN category c ON t.id_category = c.id_category
	JOIN subject s ON c.id_subject = s.id_subject
	WHERE st.is_task_done = 0 AND st.id_user = ?;
	`;
  const db = dbSingleton.getInstance();
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Tasks not found');
    }
    console.log(data);
    res.status(200).json(data);
  });
};
export const updatePoints = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const id_user = req.params.id;
    const task_weight = req.body.task_weight;
    const q = `
			UPDATE student
			SET total_points = total_points + ? 
			WHERE id_user = ?
		`;
    const db = dbSingleton.getInstance();
    db.query(q, [task_weight, id_user], (error, result) => {
      if (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Error updating points' });
      } else {
        res.status(200).json({ message: 'Points updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating table:', error);
  }
};
export const incpoints = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const id_user = req.params.id;
    const certif_point = req.body.certif_point;
    console.log(certif_point);
    const q = `
			 UPDATE student
			 SET total_points = total_points - ? 
			 WHERE id_user = ?
		 `;
    const db = dbSingleton.getInstance();
    db.query(q, [certif_point, id_user], (error, result) => {
      if (error) {
        console.error('Error updating points:', error);
        res.status(500).json({ error: 'Error updating points' });
      } else {
        res.status(200).json({ message: 'Points updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating table:', error);
  }
};
export const getStatisticData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id_subject, id_user } = req.body;
  // console.log(id);
  const q = `
	SELECT
		tf.id_tskFolder,
		tf.tskFolder_name,
		t.id_task,
		t.task_name,
		st.id_user,
    st.is_task_done
	FROM
		taskfolder tf
	JOIN
		task_tasksfolder tt ON tf.id_tskFolder = tt.id_tskFolder and id_subject= ?
	JOIN
		task t ON tt.id_task = t.id_task
	JOIN
		student_task st ON t.id_task = st.id_task
	WHERE
		st.id_user = ?
	GROUP BY
		t.id_task, st.id_user;
	`;
  const db = dbSingleton.getInstance();
  db.query(q, [id_subject, id_user], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Data not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
export const getStudentCertif = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id } = req.params;
  console.log(id);
  const q = `
   SELECT id_certif_item 
   FROM student_certification 
   WHERE id_user = ?
   `;
  const db = dbSingleton.getInstance();
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(204).json('Certifications not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
export const putcertifcard = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const id_user = req.params.id;
    const img_id = req.body.img_id;
    const q = `
	 	INSERT INTO student_certification (id_user, id_certif_item )
		values 
		(?,?)
	`;
    const db = dbSingleton.getInstance();
    db.query(q, [id_user, img_id], (error, result) => {
      if (error) {
        console.error('Error updating student certificate:', error);
        res.status(500).json({ error: 'Error updating student certificate' });
      } else {
        res.status(200).json({ message: 'student certificate updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating student certificate:', error);
  }
};
