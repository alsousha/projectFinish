import { db } from "../db.js";
import bcrypt from "bcrypt";

//Function for delete the user
export const deleteUser = (req, res) => {
  const email = req.body.email;

  // Check if the user exists
  const selectQuery = "SELECT * FROM user WHERE email = ?";
  db.query(selectQuery, [email], (err, data) => {
    if (err) {
      return res.json(err);
    }

    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }

    // User exists, delete the user
    const deleteQuery = "DELETE FROM user WHERE email = ?";
    db.query(deleteQuery, [email], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json("User deleted successfully!");
    });
  });
};

//Function for update user data
export const updateUser = (req, res) => {
  const { email, username, lastname, password } = req.body;

  // Check if the user exists
  const selectQuery = "SELECT * FROM user WHERE email = ?";
  db.query(selectQuery, [email], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length === 0) {
      return res.status(404).json("User not found!");
    }

    // Hash the new password
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.json(err);
      }

      // Update the user data with hashed password
      const updateQuery =
        "UPDATE user SET name = ?, lastName = ?, password = ? WHERE email = ?";
      db.query(
        updateQuery,
        [username, lastname, hash, email],
        (err, result) => {
          if (err) {
            return res.json(err);
          }
          //console.log([username, lastname, hash, email]);
          return res.status(200).json("User updated successfully!");
        }
      );
    });
  });
};

/** 
//Function for get subject id for teachers and class id for students
export const subjectLevel = (req, res) => {
  const userId = req.body.id_user;

  // Query the user table to check the user's role
  const selectQuery = "SELECT role FROM user WHERE id_user = ?";
  db.query(selectQuery, [userId], (err, data) => {
    if (err) {
      return res.json(err);
    }

    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    const role = data[0].role;

    if (role === "teacher") {
      // Query the teacher table to get the subject ID of the teacher
      const teacherQuery = "SELECT id_subject FROM teacher_sbjs WHERE id_user = ?";
      db.query(teacherQuery, [userId], (err, teacherData) => {
        if (err) {
          return res.json(err);
        }

        if (teacherData.length === 0) {
          return res.status(404).json("Teacher not found");
        }

        const subjectId = teacherData[0].id_subject;

        // Query the subject table to retrieve the subject name based on the subject ID
        const subjectQuery =
          "SELECT subject_name FROM subject WHERE id_subject = ?";
        db.query(subjectQuery, [subjectId], (err, subjectData) => {
          if (err) {
            return res.json(err);
          }

          if (subjectData.length === 0) {
            return res.status(404).json("Subject not found");
          }

          const subjectName = subjectData[0].subject_name;

          return res.status(200).json(subjectName);
        });
      });
    } else if (role === "student") {
      // Query the student table to get the class ID of the student
      const studentQuery = "SELECT id_class FROM student WHERE id_user = ?";
      db.query(studentQuery, [userId], (err, studentData) => {
        if (err) {
          return res.json(err);
        }

        if (studentData.length === 0) {
          return res.status(404).json("Student not found");
        }

        const classId = studentData[0].id_class;

        // Query the class table to retrieve the class name based on the class ID
        const classQuery = "SELECT class_name FROM class WHERE id_class = ?";
        db.query(classQuery, [classId], (err, classData) => {
          if (err) {
            return res.json(err);
          }

          if (classData.length === 0) {
            return res.status(404).json("Class not found");
          }

          const className = classData[0].class_name;

          return res.status(200).json(className);
        });
      });
    } else {
      // Handle if the user's role is neither teacher nor student
      return res.status(401).json("User is neither a teacher nor a student");
    }
  });
};
*/

/**
 ============================
 Start student`s functions
 ============================
 */
//Function that return student`s class level, class id and class name
export const getStudentClasses = (req, res) => {
  const userId = req.body.userId; // Access the student ID from the "userId" property

  // Query to retrieve class_level from student table
  const studentQuery = "SELECT class_level FROM student WHERE id_user = ?";
  //console.log(userId);
  db.query(studentQuery, [userId], (err, studentResult) => {
    if (err) {
      return res.json(err);
    }

    if (studentResult.length === 0) {
      return res.status(404).json("Student not found!");
    }

    const classLevel = studentResult[0].class_level;

    // Query to retrieve associated class IDs from student_class table
    const studentClassQuery =
      "SELECT id_class FROM student_class WHERE id_user = ?";
    db.query(studentClassQuery, [userId], (err, studentClassResult) => {
      if (err) {
        return res.json(err);
      }

      const classIds = studentClassResult.map((row) => row.id_class);

      // Query to retrieve class names from class table
      const classQuery = "SELECT class_name FROM class WHERE id_class IN (?)";
      db.query(classQuery, [classIds], (err, classResult) => {
        if (err) {
          return res.json(err);
        }

        const classNames = classResult.map((row) => row.class_name);

        // Prepare the response object
        const response = {
          id_user: userId,
          class_level: classLevel,
          class_ids: classIds,
          class_names: classNames,
        };

        return res.status(200).json(response);
      });
    });
  });
};

export const getCerfiticationForStud = (req, res) => {
  const userId = req.body.userId; // Access the user ID from the request body

  // Query to retrieve certification names and dates for the given user
  const certificationQuery = `
    SELECT c.name_certif, sc.data_get
    FROM certification c
    INNER JOIN student_certification sc ON c.id_certif = sc.id_certif
    WHERE sc.id_user = ?
  `;

  db.query(certificationQuery, [userId], (err, result) => {
    if (err) {
      return res.json(err);
    }

    // Extract the name_certif and data_get values from the result
    const certifications = result.map((row) => {
      const dateObj = new Date(row.data_get);
      const date = dateObj.toDateString(); // Get the date component in the format: "Sat Jun 03 2023"
      const time = dateObj.toLocaleTimeString();

      return {
        name_certif: row.name_certif,
        date: date,
        time: time,
      };
    });

    return res.status(200).json(certifications);
  });
};

/**
 ============================
 End student`s functions
 ============================
 */

/**
 ============================
 Start teacher`s functions
 ============================
 */
//Function that return teacher`s class id, class name and class level
export const getTeacherClasses = (req, res) => {
  const teacherId = req.body.userId; // Access the teacher ID from the "userId" property

  // Query to retrieve class information for the teacher
  const query = `
    SELECT id_class, class_name, class_level
    FROM class
    WHERE id_teacher = ?
  `;

  db.query(query, [teacherId], (err, result) => {
    if (err) {
      return res.json(err);
    }

    // Prepare the response object
    const response = {
      user: teacherId,
      class_ids: [],
      class_names: [],
      class_levels: [],
    };

    // Populate the response object with class information
    result.forEach((row) => {
      response.class_ids.push(row.id_class);
      response.class_names.push(row.class_name);
      response.class_levels.push(row.class_level);
    });

    return res.status(200).json(response);
  });
};

//Function that return teacher`s subjects id and subjects names
export const getTeacherSubjects = (req, res) => {
  const userId = req.body.userId; // Access the teacher ID from the "userId" property

  // Query to retrieve associated subject IDs from teacher_sbjs table
  const teacherSubjectsQuery =
    "SELECT id_subject FROM teacher_sbjs WHERE id_user = ?";
  db.query(teacherSubjectsQuery, [userId], (err, teacherSubjectsResult) => {
    if (err) {
      return res.json(err);
    }

    const subjectIds = teacherSubjectsResult.map((row) => row.id_subject);

    // Prepare placeholders for the SQL query
    const placeholders = subjectIds.map(() => "?").join(",");

    // Query to retrieve subject names from subject table
    const subjectQuery = `SELECT subject_name FROM subject WHERE id_subject IN (${placeholders})`;
    db.query(subjectQuery, subjectIds, (err, subjectResult) => {
      if (err) {
        return res.json(err);
      }

      const subjectNames = subjectResult.map((row) => row.subject_name);

      // Prepare the response object
      const response = {
        id_user: userId,
        subject_ids: subjectIds,
        subject_names: subjectNames,
      };

      return res.status(200).json(response);
    });
  });
};

//Function that return all student for specific teacher
export const getTeachersStudent = (req, res) => {
  const userId = req.body.userId; // Access the teacher ID from the "userId" property

  // Query to retrieve class IDs for the given teacher
  const classQuery = "SELECT id_class FROM class WHERE id_teacher = ?";
  db.query(classQuery, [userId], (err, classResult) => {
    if (err) {
      return res.json(err);
    }

    const classIds = classResult.map((row) => row.id_class);

    // Check if there are no class IDs for the teacher
    if (classIds.length === 0) {
      return res.status(404).json("No classes found for the teacher!");
    }

    // Query to retrieve student IDs for the classes taught by the teacher
    const studentQuery =
      "SELECT id_user FROM student_class WHERE id_class IN (?)";
    db.query(studentQuery, [classIds], (err, studentResult) => {
      if (err) {
        return res.json(err);
      }

      const studentIds = studentResult.map((row) => row.id_user);

      // Check if there are no student IDs for the classes
      if (studentIds.length === 0) {
        return res.status(404).json("No students found for the classes!");
      }

      // Query to retrieve user data for the students
      const userQuery =
        "SELECT id_user, role, email, name, lastname, img_url FROM user WHERE id_user IN (?)";
      db.query(userQuery, [studentIds], (err, userResult) => {
        if (err) {
          return res.json(err);
        }

        // Prepare the response object
        const response = userResult.map((row) => ({
          id_user: row.id_user,
          role: row.role,
          email: row.email,
          name: row.name,
          lastname: row.lastname,
          img_url: row.img_url,
        }));

        return res.status(200).json(response);
      });
    });
  });
};

//Function that get id of certification and delete it
export const deleteCertification = (req, res) => {
  const id_certif = req.body.id_certif;

  //delete the certification
  const deleteQuery = "DELETE FROM certification WHERE id_certif = ?";
  db.query(deleteQuery, [id_certif], (err, result) => {
    if (err) {
      return res.json(err);
    }

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      return res.status(404).json("Certification not found!");
    }

    return res.status(200).json("Certification deleted successfully.");
  });
};

//Function that get info categary and create new category.
export const createCategory = (req, res) => {
  const { category_name, id_subject } = req.body;

  // Query to insert a new category into the table
  const insertQuery =
    "INSERT INTO category (category_name, id_subject) VALUES (?, ?)";
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
      date_create: new Date().toISOString().slice(0, 19).replace("T", " "), // Format the date_create value correctly
      id_subject,
    };

    return res.status(200).json(category);
  });
};

//Function that get id teacher and return all categories(full info) for this teacher
export const getCategoriesByTeacher = (req, res) => {
  const id_user = req.body.id_user; // Access the teacher ID from the request body

  // Query to retrieve categories by teacher
  const query = `
    SELECT id_category, category_name, date_create, id_subject
    FROM category
    WHERE id_subject IN (
      SELECT id_subject
      FROM subject
      WHERE id_user = ?
    )`;

  db.query(query, [id_user], (err, result) => {
    if (err) {
      return res.json(err);
    }

    // Prepare the response object
    const categories = result.map((row) => ({
      id_category: row.id_category,
      category_name: row.category_name,
      date_create: new Date().toISOString().slice(0, 19).replace("T", " "),
      id_subject: row.id_subject,
    }));

    return res.status(200).json(categories);
  });
};

//Function that get category id and delete this category
export const deleteCategory = (req, res) => {
  const id_category = req.body.id_category; // Access the category ID from the request body

  // Query to delete the category
  const deleteQuery = "DELETE FROM category WHERE id_category = ?";
  db.query(deleteQuery, [id_category], (err, result) => {
    if (err) {
      return res.json(err);
    }

    // Check if any rows were affected by the deletion
    if (result.affectedRows === 0) {
      return res.status(404).json("Category not found!");
    }

    return res.status(200).json("Category deleted successfully");
  });
};


/**
 ============================
 End teacher`s functions
 ============================
 */
