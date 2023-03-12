const express = require("express");
const port = process.env.PORT || 5002;
const app = express();
const dotenv= require('dotenv').config();

const db = require("./config/mongoose");

const passport = require("passport");
const passportJWTStrategy = require("./config/passport-jwt-strategy");

app.use(express.urlencoded({ extended: true }));

app.use("/hospitalAPI", require("./routes/hospitalAPI"));
app.set(express.urlencoded());
app.listen(port, (err) => {
  if (err) return console.log("Error in running server:", err);

  console.log(`Server is up and running on http://localhost:${port}`);
});
