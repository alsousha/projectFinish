import { db } from '../db.js';
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
export const getAllTeachers = (req, res) => {
  const { id } = req.params;
  const q = `SELECT DISTINCT u.id_user, u.email, u.name, u.lastname, u.img_url, t.id_subject, s.subject_name 
	FROM user u
	JOIN teacher_sbjs t ON u.id_user = t.id_user
	JOIN subject s ON t.id_subject = s.id_subject
	WHERE u.role = 'teacher';`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json('Teachers not found');
    }
    // const classLevel = data[0].class_level;
    // console.log(data);
    res.status(200).json(data);
  });
};
export const getAllStudents = (req, res) => {
  const { id } = req.params;
  const q = `SELECT DISTINCT u.id_user, u.email, u.name, u.lastname, u.img_url, s.class_level, s.total_points
	FROM user u
	JOIN student s ON u.id_user = s.id_user
	WHERE u.role = 'student';`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json('Students not found');
    }
    res.status(200).json(data);
  });
};

export const getTeacherClassCounts = (req, res) => {
  //get count of classes
  const { id } = req.params;
  const q = `
		SELECT COUNT(*) AS class_count
		FROM class
		WHERE id_teacher = ?;
		`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json("Teacher's classes not found");
    }

    res.status(200).json(data);
  });
};
export const getTeacherTasksCounts = (req, res) => {
  //get total count of tasks
  const { id } = req.params;
  const q = `
		SELECT COUNT(*) AS task_count
		FROM task
		WHERE id_teacher = ?;
		`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json("Teacher's tasks not found");
    }

    res.status(200).json(data);
  });
};

export const getStudentAddData = (req, res) => {
  //get total count of tasks
  const { id } = req.params;
  const q = `
		SELECT class_level, total_points
		FROM student
		WHERE id_user = ?;
		`;
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json('Student not found');
    }

    res.status(200).json(data);
  });
};
export const editArticle = (req, res) => {
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
      const id_article = req.body.id;

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
          UPDATE blog
          SET
            art_title = ?,
            art_text = ?,
            art_img = ?
          WHERE
            id_article = ?
        `;

        db.query(
          q,
          [dataToSend.selectedTitle, dataToSend.selectedText, resizedImagePath, id],
          (err, result) => {
            if (err) {
              console.error('Failed to edit the article.', err);
              res.status(500).json({ error: 'Error editing the article' });
            } else {
              res.status(200).json({ message: 'Article edited successfully!' });
            }
          },
        );
      } else {
        console.log(dataToSend);

        // No file uploaded, update the task without modifying the image
        const q = `
					UPDATE blog
					SET
						art_title = ?,
						art_text = ?,
						art_img = ?
					WHERE
						id_article = ?
						
				`;

        db.query(
          q,
          [dataToSend.selectedTitle, dataToSend.selectedText, dataToSend.selectedImage, id],
          (err, result) => {
            if (err) {
              console.error('Failed to edit the article.', err);
              res.status(500).json({ error: 'Error editing the article' });
            } else {
              res.status(200).json({ message: 'Article edited successfully!' });
            }
          },
        );
      }
    });
  } catch (error) {
    console.error('Failed to create the article', error);
    res.status(500).json({ error: 'Error creating the article' });
  }
};
export const createArticle = (req, res) => {
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
      const id_article = req.body.id;

      // Access the uploaded file
      const file = req.file;
      if (file) {
        const date_create = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Resize and compress the image using sharp
        const resizedImagePath = `uploads/resized_${file.filename}`; // Define the path for the resized image
        await sharp(file.path).png({ compressionLevel: 6 }).toFile(resizedImagePath);

        // console.log(file.path); //uploads\levelone_four.png
        // Remove the original image file
        fs.unlink(file.path, (err) => {
          if (err) {
            console.error('Failed to remove the original image file', err);
          }
        });
        const q = `
				    	INSERT INTO blog
							(art_title, art_text, art_img, create_date )
				    	values
				    	(?,?,?,?)
				    `;
        // Save file path in the database
        db.query(
          q,
          [dataToSend.selectedTitle, dataToSend.selectedText, resizedImagePath, date_create],
          (err, result) => {
            if (err) {
              console.error('Failed to create the article.', err);
              res.status(500).json({ error: 'Error create the article' });
            } else {
              // console.log(result);
              res.status(200).json({ message: 'Create the article successfully!' });
            }
          },
        );
      } else {
        console.log('No file uploaded');
      }

      // res.status(200).json({ message: 'Create the task successfully!' });
    });
  } catch (error) {
    console.error('Failed to create the article', error);
    res.status(500).json({ error: 'Error creating the article' });
  }
};
export const deleteArticle = (req, res) => {
  // console.log('ddd');
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  // Delete the article
  try {
    const { id } = req.params;
    const q = 'DELETE FROM blog WHERE id_article = ?';
    // console.log(id);
    db.query(q, id, (err) => {
      if (err) {
        console.error('Error deleting article:', err);
        return res.status(500).json('Failed to delete the article.');
      } else {
        return res.status(200).json('Article deleted successfully!');
      }
    });
  } catch (error) {
    console.error('Error deleting article:', err);
  }
};
