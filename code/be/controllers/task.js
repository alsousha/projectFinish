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
export const getTasksByCategory = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  // console.log(id);
  const q = `SELECT  task_name, id_task
					FROM task 
					WHERE id_category = ?`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(204).json('Tasks not found');
    }
    // console.log(data);
    // Send the class level as the response
    res.status(200).json(data);
  });
};
export const addTaskToFolder = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // console.log('add');
  try {
    const { id } = req.params;
    const { id_tskFolder } = req.body;
    // console.log(id);
    // console.log(id_tskFolder);
    const q = `
  		INSERT INTO task_tasksfolder (id_task, id_tskFolder) values (?,?)
  	`;

    db.query(q, [id, id_tskFolder], (err, result) => {
      if (err) {
        console.error('Failed to add the task to folder.', err);
        res.status(500).json({ error: 'Error add task' });
      } else {
        res.status(200).json({ message: 'Task added to folder successfully!' });
      }
    });
  } catch (error) {
    console.error('Failed to add the task to folder.', error);
  }
};
export const deleteTaskFromFolder = (req, res) => {
  // console.log('ddd');
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // Delete the task from tsk_folder
  try {
    const { id } = req.params;
    const { id_tskFolder } = req.body;
    console.log(req.query.folder);
    const q = 'DELETE FROM task_tasksfolder WHERE id_task = ? AND id_tskFolder = ?';
    // console.log(id_class);
    db.query(q, [id, req.query.folder], (err) => {
      if (err) {
        console.error('Error deleting task:', err);
        return res.status(500).json('Failed to delete the task.');
      } else {
        return res.status(200).json('Task deleted successfully!');
      }
    });
  } catch (error) {
    console.error('Error deleting task:', err);
  }
};
export const getFolderStatus = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  // console.log(id);
  const q = `SELECT  is_publish
					FROM taskfolder 
					WHERE id_tskFolder = ?`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(204).json('Tasks not found');
    }
    // console.log(data);
    // Send the class level as the response
    res.status(200).json(data[0].is_publish);
  });
};
export const publishFolder = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  console.log('add');
  try {
    const { id_tskFolder } = req.body;
    const q = `
			UPDATE taskfolder
			SET is_publish = TRUE
			WHERE id_tskFolder = ?  	
		`;

    db.query(q, [id_tskFolder], (err, result) => {
      if (err) {
        console.error('Failed to publish the folder.', err);
        res.status(500).json({ error: 'Error publish the folder' });
      } else {
        res.status(200).json({ message: 'Publish the folder successfully!' });
      }
    });
  } catch (error) {
    console.error('Failed to publish the folder', error);
  }
};
