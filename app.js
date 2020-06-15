const express = require("express");
const bodyParser = require("body-parser");

const workout = require("./routes/workout.route");
const database = require("./config/database");

const app = express();

// Connect to mongoDB
const mongoose = require("mongoose");
let mongoDB = process.env.MONGODB_URI || database.url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use("/workout", workout);

const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
