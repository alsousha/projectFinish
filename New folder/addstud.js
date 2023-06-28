import fs from "fs";
import csv from "csv-parser";
import db from "./db";

export const addStudentsToClass = (req, res) => {
  const students = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      students.push(data.email);
    })
    .on("end", () => {
      fs.unlinkSync(req.file.path);

      const q = "SELECT id_user, email, role FROM user WHERE email IN (?)";
      db.query(q, [students], (err, data) => {
        if (err) {
          console.error("Error querying the database:", err);
          return res.status(500).json({ error: "Error querying the database" });
        }

        const validStudents = [];
        const invalidStudents = [];

        for (const student of data) {
          if (student.role === "student") {
            validStudents.push(student);
          } else {
            invalidStudents.push(student.email);
          }
        }

        if (validStudents.length > 0) {
          const values = validStudents.map((student) => [
            student.id_user,
            req.body.id_class,
          ]);
          const qInsertStudentToClass =
            "INSERT INTO student_class (id_user, id_class) VALUES ?";

          db.query(qInsertStudentToClass, [values], (error) => {
            if (error) {
              console.error("Failed to add new students", error);
              res.status(500).json({ error: "Error adding new students" });
            } else {
              const message = `Added ${validStudents.length} students successfully!`;
              res.status(200).json({ message, invalidStudents });
              console.log(message);
              console.log("Invalid students:", invalidStudents);
            }
          });
        } else {
          const errorMessage = "No valid students found!";
          res.status(409).json({ error: errorMessage });
          console.log(errorMessage);
        }
      });
    });
};
