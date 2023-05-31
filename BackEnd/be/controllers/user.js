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
}

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
      const teacherQuery = "SELECT id_subject FROM teacher WHERE id_user = ?";
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



