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
        res.status(500).json({ error: 'Error updating class' });
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
  const { category_name, id_subject } = req.body;

  // Query to insert a new category into the table
  const insertQuery = 'INSERT INTO category (category_name, id_subject) VALUES (?, ?)';
  db.query(insertQuery, [category_name, id_subject], (err, result) => {
    if (err) {
      return res.json(err);
    }

    // Get the generated category ID
    const id_category = result.insertId;

    // Prepare the response object
    const category = {
      id_category,
      category_name,
      date_create: new Date().toISOString().slice(0, 19).replace('T', ' '), // Format the date_create value correctly
      id_subject,
    };

    return res.status(200).json(category);
  });
};
//Function that get id teacher and return all categories(full info) for this teacher
export const getCategoriesByTeacher = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id } = req.params;
  console.log(id);

  // Query to retrieve categories by teacher
  // const query = `
  //   SELECT id_category, category_name, date_create, id_subject
  //   FROM category
  //   WHERE id_subject IN (
  //     SELECT id_subject
  //     FROM teacher_sbjs
  //     WHERE id_user = ?
  //   )`;

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
