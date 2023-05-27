import { db } from "../db.js";

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
