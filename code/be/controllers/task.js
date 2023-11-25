// import { db } from '../db.js';
import { dbSingleton } from '../dbSingleton.js';
// import DatabaseSingleton from '../dbSingleton.js'; // Import the class

import multer from 'multer';
import sharp from 'sharp'; // Import the sharp library(compress img)
import fs from 'fs';
import { log } from 'console';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    // Customize the filename if needed
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

export const createTask = (req, res) => {
  console.log('ff');
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  try {
    upload.single('selectedFile')(req, res, async (err) => {
      if (err) {
        console.error('Error parsing form data', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      // const { dataToSend, specificTaskData, id_teacher } = req.body;
      const dataToSend = JSON.parse(req.body.dataToSend); // Parse the JSON string to an object
      const specificTaskData = JSON.parse(req.body.specificTaskData); // Parse the JSON string to an object
      const id_teacher = req.body.id_teacher;

      // console.log(dataToSend);
      // console.log(dataToSend.newItemName);

      // Access the uploaded file
      const file = req.file;
      if (file) {
        // console.log(file);
        // File is available, process it as needed
        const filePath = file.path;
        const date_create = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Resize and compress the image using sharp
        const resizedImagePath = `uploads/resized_${file.filename}`; // Define the path for the resized image
        await sharp(file.path)
          // .resize({ width: 170, height: 120 })
          // .jpeg({ quality: 80 })
          .png({ compressionLevel: 6 })
          .toFile(resizedImagePath);

        // console.log(file.path); //uploads\levelone_four.png
        // Remove the original image file
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Failed to remove the original image file', err);
          }
        });
        const q = `
				    	INSERT INTO task
							(task_name, task_text, task_create_date, task_weight, task_level, id_teacher , id_category , id_template, specific_data, task_img )
				    	values
				    	(?,?,?,?,?,?,?,?,?,?)
				    `;
        // Save file path in the database
        const db = dbSingleton.getInstance();
        db.query(
          q,
          [
            dataToSend.newItemName,
            dataToSend.instruction,
            date_create,
            dataToSend.selectedWeight,
            dataToSend.selectedLevel,
            id_teacher,
            dataToSend.selectedCategory,
            dataToSend.selectedTemplate,
            JSON.stringify(specificTaskData),
            resizedImagePath, // Save the path of the resized image
          ],
          (err, result) => {
            if (err) {
              console.error('Failed to create the task.', err);
              res.status(500).json({ error: 'Error create the task' });
            } else {
              // console.log(result);
              res.status(200).json({ message: 'Create the task successfully!' });
            }
          },
        );
      } else {
        console.log('No file uploaded');
      }

      // res.status(200).json({ message: 'Create the task successfully!' });
    });
  } catch (error) {
    console.error('Failed to create the task', error);
    res.status(500).json({ error: 'Error creating the task' });
  }
};
export const editTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id } = req.params;
  // console.log(id);
  try {
    upload.single('selectedFile')(req, res, async (err) => {
      if (err) {
        console.error('Error parsing form data', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const dataToSend = JSON.parse(req.body.dataToSend);
      const specificTaskData = JSON.parse(req.body.specificTaskData);
      const id_teacher = req.body.id_teacher;

      // Access the uploaded file
      const file = req.file;
      if (file) {
        // File is available, process it as needed
        const date_create = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Resize and compress the image using sharp
        const resizedImagePath = `uploads/resized_${file.filename}`;
        // await sharp(file.path)
        //   .resize({ width: 800, height: 800, fit: 'inside' }) // Resize the image while maintaining aspect ratio
        //   .jpeg({ quality: 80 }) // Compress the image as a JPEG
        //   .toFile(resizedImagePath);
        await sharp(file.path)
          // .resize({ width: 170, height: 120 })
          // .jpeg({ quality: 80 })
          .png({ compressionLevel: 6 })
          .toFile(resizedImagePath);

        // Remove the original image file
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Failed to remove the original image file', err);
          }
        });

        const q = `
          UPDATE task
          SET
            task_name = ?,
            task_text = ?,
            task_create_date = ?,
            task_weight = ?,
            task_level = ?,
            id_teacher = ?,
            id_category = ?,
            id_template = ?,
            specific_data = ?,
            task_img = ?
          WHERE
            id_task = ?
        `;
        const db = dbSingleton.getInstance();
        db.query(
          q,
          [
            dataToSend.newItemName,
            dataToSend.instruction,
            date_create,
            dataToSend.selectedWeight,
            dataToSend.selectedLevel,
            id_teacher,
            dataToSend.selectedCategory,
            dataToSend.selectedTemplate,
            JSON.stringify(specificTaskData),
            resizedImagePath,
            id,
          ],
          (err, result) => {
            if (err) {
              console.error('Failed to edit the task.', err);
              res.status(500).json({ error: 'Error editing the task' });
            } else {
              res.status(200).json({ message: 'Task edited successfully!' });
            }
          },
        );
      } else {
        // No file uploaded, update the task without modifying the image
        const q = `
          UPDATE task
          SET
            task_name = ?,
            task_text = ?,
            task_weight = ?,
            task_level = ?,
            id_teacher = ?,
            id_category = ?,
            id_template = ?,
            specific_data = ?
          WHERE
            id_task = ?
        `;
        const db = dbSingleton.getInstance();
        db.query(
          q,
          [
            dataToSend.newItemName,
            dataToSend.instruction,
            dataToSend.selectedWeight,
            dataToSend.selectedLevel,
            id_teacher,
            dataToSend.selectedCategory,
            dataToSend.selectedTemplate,
            JSON.stringify(specificTaskData),
            id,
          ],
          (err, result) => {
            if (err) {
              console.error('Failed to edit the task.', err);
              res.status(500).json({ error: 'Error editing the task' });
            } else {
              res.status(200).json({ message: 'Task edited successfully!' });
            }
          },
        );
      }
    });
  } catch (error) {
    console.error('Failed to create the task', error);
    res.status(500).json({ error: 'Error creating the task' });
  }
};
export const getTasksByTeacher = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const countTask = parseInt(req.query.count);
  const q = `
	SELECT tsk.*, c.category_name, t.template_name, s.id_subject, s.subject_name
  FROM task tsk 
  JOIN category c ON tsk.id_category = c.id_category
  JOIN template t ON tsk.id_template = t.id_template
  JOIN subject s ON c.id_subject = s.id_subject
  WHERE tsk.id_teacher = ?
  LIMIT ?`;
  const db = dbSingleton.getInstance();
  db.query(q, [id, countTask], (err, data) => {
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
export const getTaskByUser = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  const { role, task_id } = req.body;
  let q;
  if (role === 'student') {
    q = `SELECT id_task 
		FROM student_task  
		WHERE id_user = ? and id_task = ?`;
  } else if (role === 'teacher') {
    q = `SELECT id_task 
		FROM task  
		WHERE id_teacher = ? and id_task = ?`;
  }
  const db = dbSingleton.getInstance();
  db.query(q, [id, task_id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(204).json('Tasks not found');
    }
    // Send the class level as the response
    res.status(200).json(data);
  });
};
export const getTasksGlobal = (req, res) => {
  const { selectedSubjects, selectedTemplates, selectedLevels, selectedWeights } = req.body;
  // console.log(selectedLevels);
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  //  const { role, task_id } = req.body;
  const subjectIds = selectedSubjects.map((subject) => subject.id_subject);
  const templateIds = selectedTemplates.map((template) => template.id_template);

  const q = `
		SELECT t.*, s.subject_name, c.category_name
		FROM task t
		JOIN category c ON t.id_category = c.id_category 
		JOIN subject s ON c.id_subject = s.id_subject
		WHERE c.id_subject IN (?)
		AND t.id_template IN (?)
		AND t.task_level IN (?)
		AND t.task_weight IN (?)
	`;
  const db = dbSingleton.getInstance();
  db.query(q, [subjectIds, templateIds, selectedLevels, selectedWeights], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the tasks exists
    if (data.length === 0) {
      return res.status(204).json('Tasks not found');
    }
    res.status(200).json(data);
  });
};
export const getTasksByCategory = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  // console.log(id);
  const q = `SELECT  *
					FROM task 
					WHERE id_category = ?`;
  const db = dbSingleton.getInstance();
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
export const getMoreInfoTask = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');

  const { id } = req.params;
  // console.log(id);
  const q = `SELECT  name, lastname, subject_name, , id_task
					FROM task 
					WHERE id_category = ?`;
  const db = dbSingleton.getInstance();
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
    const db = dbSingleton.getInstance();
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
    const db = dbSingleton.getInstance();
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
  const db = dbSingleton.getInstance();
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
  try {
    // const { id_tskFolder } = req.body;
    const { id } = req.params;
    const q = `
			UPDATE taskfolder
			SET is_publish = TRUE
			WHERE id_tskFolder = ?  	
		`;
    const db = dbSingleton.getInstance();
    db.query(q, [id], (err, result) => {
      if (err) {
        console.error('Failed to publish the folder.', err);
        res.status(500).json({ error: 'Error publish the folder' });
      } else {
        const q2 = `
					INSERT INTO student_task (id_user, id_task, id_tskFolder)
					SELECT sc.id_user, ttf.id_task, ttf.id_tskFolder
					FROM task_tasksfolder ttf
					JOIN taskFolder tf ON ttf.id_tskfolder = tf.id_tskFolder
					JOIN student_class sc ON tf.id_class = sc.id_class
					WHERE ttf.id_tskFolder = ?;`;

        db.query(q2, [id], (err, result) => {
          if (err) {
            console.error('Failed to publish the folder.', err);
            res.status(500).json({ error: 'Error publish the folder' });
          } else {
            res.status(200).json({ message: 'Publish the folder successfully!' });
          }
        });
        // res.status(200).json({ message: 'Publish the folder successfully!' });
      }
    });
  } catch (error) {
    console.error('Failed to publish the folder', error);
  }
};
export const deleteTask = (req, res) => {
  // console.log('ddd');
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // Delete the task
  try {
    const { id } = req.params;
    const q = 'DELETE FROM task WHERE id_task = ?';
    // console.log(id);
    const db = dbSingleton.getInstance();
    db.query(q, id, (err) => {
      if (err) {
        console.error('Error deleting task:', err);
        return res.status(500).json('Failed to delete the task.');
      } else {
        // Remove the original image file
        // fs.unlink(file.path, (err) => {
        //   if (err) {
        //     console.error('Failed to remove the original image file', err);
        //   }
        // });
        return res.status(200).json('Task deleted successfully!');
      }
    });
  } catch (error) {
    console.error('Error deleting task:', err);
  }
};
export const updateTaskDone = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  try {
    const id_user = req.params.id;
    const id_task = req.body.id_task;
    const q = `
			UPDATE student_task
			SET is_task_done = 1 
			WHERE id_user = ? and id_task = ?
		`;
    const db = dbSingleton.getInstance();
    db.query(q, [id_user, id_task], (error, result) => {
      if (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Error updating task done' });
      } else {
        res.status(200).json({ message: 'Task updated successfully' });
      }
    });
  } catch (error) {
    console.error('Error updating table:', error);
  }
};
