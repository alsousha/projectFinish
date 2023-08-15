import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const getTeacherClasses = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const q = 'SELECT id_class, class_name FROM class WHERE id_teacher = ?';
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(404).json('User not found');
    }
    // console.log(data);
    // Send the class level as the response
    res.status(200).json({ data });
  });
};
export const getTeacherCats = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const q = 'SELECT id_class, class_name FROM class WHERE id_teacher = ?';
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(404).json('User not found');
    }
    // console.log(data);
    // Send the class level as the response
    res.status(200).json({ data });
  });
};
export const updateClass = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const id_class = req.params.id;
    const q = 'UPDATE class SET class_name = ? WHERE id_class = ?';
    db.query(q, [req.body.class_name, id_class], (error) => {
      if (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ error: 'Error updating class' });
      } else {
        res.status(200).json({ message: 'Class updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating table:', error);
  }
};

export const addNewClass = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  try {
    const id_teacher = req.params.id;
    const { class_name } = req.body;
    const q = 'INSERT INTO class (class_name, id_teacher) VALUES (?, ?)';
    db.query(q, [class_name, id_teacher], (error) => {
      if (error) {
        console.error('Failed to add the new class.', error);
        res.status(500).json({ error: 'Error add class' });
      } else {
        res.status(200).json({ message: 'New class added successfully!' });
      }
    });
  } catch (error) {
    console.error('Failed to add the new class.', error);
  }
};

export const deleteClass = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // // Delete the class with the specified id_class
  try {
    const id_class = req.params.id;
    const q = 'DELETE FROM class WHERE id_class = ?';
    // console.log(id_class);
    db.query(q, id_class, (err) => {
      if (err) {
        console.error('Error deleting class:', err);
        return res.status(500).json('Failed to delete the class.');
      } else {
        return res.status(200).json('Class deleted successfully!');
      }
    });
  } catch (error) {
    console.error('Error deleting class:', err);
  }
};

//cats
//Function that get info categary and create new category.
export const addNewCategory = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // console.log('add');
  try {
    const { category_name, subject_name } = req.body;
    // console.log(category_name);
    // console.log(subject_name);
    // Query to insert a new category into the table
    const q = `
			INSERT INTO category (category_name, id_subject)
			SELECT ?, subject.id_subject
			FROM subject
			WHERE subject.subject_name = ?
			LIMIT 1
		`;

    db.query(q, [category_name, subject_name], (err, result) => {
      if (err) {
        console.error('Failed to add the new category.', err);
        res.status(500).json({ error: 'Error add category' });
      } else {
        res.status(200).json({ message: 'New category added successfully!' });
      }

      // Get the generated category ID
      // const id_category = result.insertId;
    });
  } catch (error) {
    console.error('Failed to add the new category.', error);
  }
};
//Function that get id teacher and return all categories(full info) for this teacher
export const getCategoriesByTeacher = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id } = req.params;

  const query = `
	SELECT c.id_category, c.category_name, c.date_create, c.id_subject, s.subject_name
	FROM category c
	JOIN subject s ON c.id_subject = s.id_subject
	WHERE c.id_subject IN (
		SELECT id_subject
		FROM teacher_sbjs
		WHERE id_user = ?
	)`;

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.json(err);
    }

    // Prepare the response object
    const categories = result.map((row) => ({
      id_category: row.id_category,
      category_name: row.category_name,
      date_create: new Date().toISOString().slice(0, 19).replace('T', ' '),
      id_subject: row.id_subject,
      subject_name: row.subject_name,
    }));

    return res.status(200).json(categories);
  });
};
export const getCategoriesBySubject = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id_folder } = req.body;
  // console.log(id_folder);

  const q = `
		SELECT c.id_category, c.category_name, c.id_subject
		FROM category c
		JOIN taskfolder tf ON c.id_subject = tf.id_subject
		WHERE tf.id_tskFolder = ?;
	`;

  db.query(q, [id_folder], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(404).json('Categories not found');
    }
    console.log(data);
    res.status(200).json(data);
  });
};
export const getCategoriesBySpecSubject = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id } = req.params;
  // console.log(id_folder);

  const q = `
		SELECT id_category, category_name
		FROM category 
		WHERE id_subject = ?;
	`;

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(404).json('Categories not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};

export const updateCategory = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const id_cat = req.params.id;
    console.log(req.body.category_name);
    console.log(req.body.subject_name);
    // console.log(id_cat);
    const q = `
			UPDATE category
			SET category_name = ?,
					id_subject = (
						SELECT id_subject
						FROM subject
						WHERE subject_name = ?
						LIMIT 1
					)
			WHERE id_category = ?
		`;

    db.query(q, [req.body.category_name, req.body.subject_name, id_cat], (error, result) => {
      // Check if any rows were affected by the update
      // if (result.affectedRows === 0) {
      //   return res.status(404).json('Category not found!');
      // }
      if (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Error updating category' });
      } else {
        res.status(200).json({ message: 'Category updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating table:', error);
  }
};
export const deleteCategory = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // // Delete the cat with the specified id_cat
  try {
    const id_category = req.params.id;
    const q = 'DELETE FROM category WHERE id_category = ?';
    // console.log(id_class);
    db.query(q, id_category, (err) => {
      if (err) {
        console.error('Error deleting category:', err);
        return res.status(500).json('Failed to delete the category.');
      } else {
        return res.status(200).json('Category deleted successfully!');
      }
    });
  } catch (error) {
    console.error('Error deleting category:', err);
  }
};

//students
export const getStudentsByTeacher = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const { id_class } = req.body;
  const q = `SELECT user.id_user, user.name, user.lastname, user.email, student_class.id_class, class_name FROM user 
						 JOIN student_class ON user.id_user = student_class.id_user
						 JOIN class ON student_class.id_class = class.id_class
  					 WHERE class.id_teacher = ? AND class.id_class = ?`;
  db.query(q, [id, id_class], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      //get class name
      const qCatName = 'SELECT class_name FROM class WHERE id_class = ?';
      db.query(qCatName, [id_class], (err, data) => {
        if (err) return res.status(500).json(err);
        // Check if the class exists
        if (data.length === 0) {
          return res.status(404).json('Class not found');
        }
        const dataRes = {
          noStudents: true,
          class_name: data[0].class_name,
        };
        // console.log(data[0].class_name);
        res.status(200).json(dataRes);
      });
      // return res.status(404).json('Students not found');
    } else {
      const dataRes = {
        noStudents: false,
        data: data,
      };
      // console.log(data[0].class_name);
      res.status(200).json(dataRes);
    }
    // console.log(data);
    // Send the students as the response
  });
};
export const getAllStudentsByTeacher = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const q = `SELECT user.id_user, user.name, user.lastname, user.email, student_class.id_class, class.class_name 
						 FROM user 
						 JOIN student_class ON user.id_user = student_class.id_user
						 JOIN class ON student_class.id_class = class.id_class
  					 WHERE class.id_teacher = ?`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(201).json('Students not found');
    } else {
      res.status(200).json(data);
    }
  });
};

export const deleteStudentFromClass = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  // // Delete the cat with the specified id_cat
  try {
    const id_user = req.params.id;
    const q = 'DELETE FROM student_class WHERE id_user = ? AND id_class = ?';
    db.query(q, [id_user, req.query.class], (err) => {
      if (err) {
        console.error('Error deleting student:', err);
        return res.status(500).json('Failed to delete the student.');
      } else {
        return res.status(200).json('Student deleted successfully!');
      }
    });
  } catch (error) {
    console.error('Error deleting student:', err);
  }
};
export const addStudentsToClass = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // console.log(req.body.student_email);

  //check existing user
  const q = 'SELECT id_user, email, role FROM user WHERE email = ?';
  db.query(q, [req.body.student_email], (err, data) => {
    if (err) return res.json(err);
    if (data.length && data[0].role === 'student') {
      const qInsertStudentToClass = 'INSERT INTO student_class (id_user, id_class) VALUES (?, ?)';

      db.query(qInsertStudentToClass, [data[0].id_user, req.body.id_class], (error) => {
        if (error) {
          console.error('Failed to add new student', error);
          res.status(500).json({ error: 'Error add new student' });
        } else {
          res.status(200).json({ message: 'New student added successfully!' });
        }
      });
    } else {
      // return res.status(409).json({ error: 'User is not exists!' });
      return res.status(209).json({ error: 'User is not exists!' });
    }
  });

  // try {
  //   const id_teacher = req.params.id;
  //   const { class_name } = req.body;
  //   const q = 'INSERT INTO class (class_name, id_teacher) VALUES (?, ?)';
  //   db.query(q, [class_name, id_teacher], (error) => {
  //     if (error) {
  //       console.error('Failed to add the new class.', error);
  //       res.status(500).json({ error: 'Error add class' });
  //     } else {
  //       res.status(200).json({ message: 'New class added successfully!' });
  //     }
  //   });
  // } catch (error) {
  //   console.error('Failed to add the new class.', error);
  // }
};

//task's folders
export const getTasksFoldersByIdClass = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id_class } = req.body;

  const q = `
	SELECT t.id_tskFolder, t.tskFolder_name, t.id_subject, s.subject_name
	FROM taskfolder t
	JOIN subject s ON t.id_subject = s.id_subject
	WHERE id_class = ?
	`;

  db.query(q, [id_class], (err, data) => {
    if (err) return res.status(500).json(err);
    const dataRes = {
      noElements: data.length === 0,
      data: data,
    };

    //get class name for title
    const qName = 'SELECT class_name FROM class WHERE id_class = ?';
    db.query(qName, [id_class], (err, data) => {
      if (err) return res.status(500).json(err);
      dataRes.class_name = data.length !== 0 ? data[0].class_name : '';
      res.status(200).json(dataRes);
    });
  });
};
export const updateTskFolder = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const id_tskfolder = req.params.id;
    // console.log(req.body.tskFolder_name);
    const q = `
		UPDATE taskfolder
		SET tskFolder_name = ?,
				id_subject = (
					SELECT id_subject
					FROM subject
					WHERE subject_name = ?
					LIMIT 1
				)
		WHERE id_tskFolder = ?
	`;
    // const q = 'UPDATE taskfolder SET tskFolder_name = ? WHERE id_tskFolder = ?';
    db.query(q, [req.body.tskFolder_name, req.body.subject_name, id_tskfolder], (error, result) => {
      // Check if any rows were affected by the update
      if (result.affectedRows === 0) {
        return res.status(404).json('Folder not found!');
      }
      if (error) {
        console.error('Error updating folder:', error);
        res.status(500).json({ error: 'Error updating folder' });
      } else {
        res.status(200).json({ message: 'Folder updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating table:', error);
  }
};
export const deleteTskFolder = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // // Delete the cat with the specified id_cat
  try {
    const id_tskfolder = req.params.id;
    const q = 'DELETE FROM taskfolder WHERE id_tskFolder = ?';
    // console.log(id_class);
    db.query(q, id_tskfolder, (err) => {
      if (err) {
        console.error('Error deleting folder:', err);
        return res.status(500).json('Failed to delete the folder.');
      } else {
        return res.status(200).json('Folder deleted successfully!');
      }
    });
  } catch (error) {
    console.error('Error deleting category:', err);
  }
};
export const isExistsTasksDone = (req, res) => {
  console.log('eeee');
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const id_tskfolder = req.params.id;
    console.log(id_tskfolder);
    //   const q = `
    // 	SELECT EXISTS (
    // 		SELECT 1
    // 		FROM task t
    // 		JOIN task_tasksfolder tt ON t.id_task = tt.id_task
    // 		WHERE tt.id_tskFolder = ? AND t.is_done = true
    // 	) AS is_exists;
    // `;

    const q = `
		SELECT EXISTS (
			SELECT 1
			FROM student_task st
			JOIN task_tasksfolder t ON st.id_task = t.id_task
			WHERE t.id_tskFolder = ? AND st.is_task_done = true
		) AS is_exists;
	`;
    // const q = 'UPDATE taskfolder SET tskFolder_name = ? WHERE id_tskFolder = ?';
    db.query(q, id_tskfolder, (error, data) => {
      console.log('data[0]');
      if (error) {
        console.error('Failed to fetch data', error);
        res.status(500).json({ error: 'Error to fetch data' });
      } else {
        if (data[0].is_exists) res.status(200).json({ message: 'There are tasks done' });
        else res.status(204).json({ message: 'There are not tasks done!' });
        // console.log(data[0].is_exists);
      }
    });
  } catch (error) {
    console.error('Error updating table:', error);
  }
};

export const addNewTskFolder = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  try {
    const { tskFolder_name, id_class, subject_name } = req.body;
    // console.log(tskFolder_name);
    // console.log(id_class);
    // console.log(subject_name);
    // const q = 'INSERT INTO taskfolder (tskFolder_name, id_class) VALUES (?,?)';

    const q = `
			INSERT INTO taskfolder (tskFolder_name, id_class, id_subject)
			SELECT ?, ?, s.id_subject
			FROM subject AS s
			WHERE s.subject_name = ?
			LIMIT 1
		`;

    db.query(q, [tskFolder_name, id_class, subject_name], (error) => {
      if (error) {
        console.error('Failed to add the new folder.', error);
        res.status(500).json({ error: 'Error add folder' });
      } else {
        res.status(200).json({ message: 'New folder added successfully!' });
      }
    });
  } catch (error) {
    console.error('Failed to add the new folder.', error);
  }
};

export const getAllTemplates = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const q = `
	SELECT *
	FROM template
	`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(404).json('Templates not found');
    }
    // console./log(data);
    res.status(200).json(data);
  });
};

export const getSubjectsByTeacher = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const q = `SELECT ts.id_subject, s.subject_name
						 FROM teacher_sbjs ts
						 JOIN subject s ON ts.id_subject = s.id_subject
  					 WHERE ts.id_user = ?`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the data exists
    if (data.length === 0) {
      return res.status(404).json('subjects not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
export const getFolderByTeacher = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id_teacher, id_folder } = req.body;
  const q = `SELECT f.id_tskFolder
						 FROM taskfolder f
						 JOIN class c ON f.id_class = c.id_class
  					 WHERE c.id_teacher = ? AND f.id_tskFolder = ?`;
  db.query(q, [id_teacher, id_folder], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the data exists
    if (data.length === 0) {
      return res.status(404).json('tasks not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};

export const getTasksByFolder = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id_folder } = req.body;
  const q = `SELECT tf.id_tskFolder, tf.id_task, t.* 
           FROM task_tasksfolder tf
           JOIN task t ON tf.id_task = t.id_task
           WHERE tf.id_tskFolder = ?`;
  db.query(q, [id_folder], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the data exists
    if (data.length === 0) {
      return res.status(201).json('tasks not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};

export const getTasksByStudent = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { students, tasks } = req.body;
  const q = `
		SELECT id_user, id_task, is_task_done
		FROM student_task
		WHERE id_user IN (?) AND id_task IN (?)
`;
  db.query(q, [students, tasks], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the data exists
    if (data.length === 0) {
      return res.status(404).json('data not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};

// export const getStatisticsByClass = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json('Not authenticated!');
//   const { id_folder } = req.body;
//   const q = `SELECT tf.id_tskFolder, tf.id_task, t.*
//            FROM task_tasksfolder tf
//            JOIN task t ON tf.id_task = t.id_task
//            WHERE tf.id_tskFolder = ?`;
//   db.query(q, [id_folder], (err, data) => {
//     if (err) return res.status(500).json(err);
//     // Check if the data exists
//     if (data.length === 0) {
//       return res.status(201).json('tasks not found');
//     }
//     // console.log(data);
//     res.status(200).json(data);
//   });
// };

export const getTaskCompletionByClass = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { selectedTask, classId } = req.body;
  // console.log(selectedTask);
  // console.log(classId);
  const q = `
	SELECT
		c.id_class,
		c.class_name,
		COUNT(s.id_user) AS total_students,
		SUM(st.is_task_done) AS completed_students,
		(SUM(st.is_task_done) / COUNT(s.id_user)) * 100 AS completion_percentage
	FROM
		class c
	JOIN
		student_class s ON c.id_class = s.id_class
	LEFT JOIN
		student_task st ON s.id_user = st.id_user AND st.id_task = ?
	WHERE
		c.id_class = ?
	GROUP BY
		c.id_class, c.class_name;
  `;

  db.query(q, [selectedTask, classId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(204).json('Data not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
export const getTaskdataperstudent = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { students, taskId } = req.body;
  // console.log(selectedTask);
  // console.log(classId);
  const q = `
  SELECT
    st.id_user,
    u.name,
		u.lastname,
    st.id_task,
    st.is_task_done
  FROM
    student_task st
  JOIN user u ON st.id_user = u.id_user
  WHERE
    st.id_user IN (?) AND st.id_task = ?
`;

  db.query(q, [students, taskId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(204).json('Data not found');
    }
    // console.log(data);
    res.status(200).json(data);
  });
};
