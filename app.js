const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
const MongoStore = require("connect-mongo")(session);

const database = require("./config/database");
const routes = require("./routes");

const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

// set env variables
const {
  PORT = 3001,
  NODE_ENV = "development",

  SESS_NAME = "sid",
  SESS_SECRET = "This is my session secret that is impossible to guess so don't even try hacker",
  SESS_LIFETIME = ONE_WEEK,
} = process.env;

const IN_PROD = NODE_ENV === "production";

const app = express();

// Connect to mongoDB
let mongoDB = process.env.MONGODB_URI || database.url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(
  session({
    name: SESS_NAME, // name of session ID cookie to set in the response
    genid: (req) => {
      // function to generate a unique user id
      console.log("Inside the session middleware");
      console.log(req.sessionID);
      return uuidv4();
    },
    secret: SESS_SECRET, // secret used to sign the session ID cookie
    saveUninitialized: false, // forces a session that is "uninitialized" to be saved to the store (set to false)
    resave: false, // forces the session to be saved back to the session store
    cookie: {
      maxAge: SESS_LIFETIME, // set lifetime of cookie
      sameSite: true, // only uses cookie for current site
      secure: IN_PROD, // set to false unless in production, requires HTTPS for production
    },
    store: new MongoStore({
      mongooseConnection: db,
      secret: SESS_SECRET,
      touchAfter: 24 * 3600,
      autoRemove: "disabled",
    }),
  })
);

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

const hostname = "127.0.0.1";

app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
