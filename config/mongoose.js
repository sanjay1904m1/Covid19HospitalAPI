const mongoose = require("mongoose");
const dotenv= require('dotenv').config();
// connect to mongodb
mongoose.connect(process.env.MONGO_URL);

//get the connection
const db = mongoose.connection;

// on error show error message on console
db.on(
  "error",
  console.error.bind(console, "Error connecting to the database :: MongoDB")
);

// on successful connection show successful message
db.once("open", () =>
  console.log("Successfully connected to the db :: MongoDB")
);

module.exports = db;
