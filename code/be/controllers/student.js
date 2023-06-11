import { db } from '../db.js';

export const getStudentClassLevel = (req, res) => {
  const { id } = req.params;
  const q = 'SELECT class_level FROM student WHERE id_user = ?';
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the user exists
    if (data.length === 0) {
      return res.status(404).json('User not found');
    }
    const classLevel = data[0].class_level;
    // Send the class level as the response
    res.status(200).json({ classLevel });
  });
};

export const getStudentSbjs = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated!');
  const { id_user } = req.body;
  // console.log(id);

  const q = `
	SELECT sb.id_subject, sb.subject_name
  FROM student_class sc
  JOIN class c ON sc.id_class = c.id_class
  JOIN teacher_sbjs ts ON c.id_teacher = ts.id_user
  JOIN subject sb ON ts.id_subject = sb.id_subject
  WHERE sc.id_user = ?
	`;

  db.query(q, [id_user], (err, data) => {
    if (err) return res.status(500).json(err);
    // Check if the elems exists
    if (data.length === 0) {
      const dataRes = {
        noElements: true,
        // class_name: data[0].class_name,
      };
      res.status(200).json(dataRes);
      // //get class name for title
      // const qName = 'SELECT class_name FROM class WHERE id_class = ?';
      // db.query(qName, [id_class], (err, data) => {
      //   if (err) return res.status(500).json(err);
      //   // Check if the class exists
      //   if (data.length === 0) {
      //     return res.status(404).json('Class not found');
      //   }
      //   const dataRes = {
      //     noElements: true,
      //     class_name: data[0].class_name,
      //   };
      //   console.log(data[0].class_name);
      //   res.status(200).json(dataRes);
      // });
      // return res.status(404).json('Students not found');
    } else {
      const dataRes = {
        noElements: false,
        data: data,
      };
      // console.log(data);
      res.status(200).json(dataRes);
    }
  });
};
