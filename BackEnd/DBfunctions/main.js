const express = require("express");
const app = express();
const registerRouter = require("./registerNewUser.js");

app.use(express.json());
app.use(registerRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
