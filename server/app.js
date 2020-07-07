const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");

const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

//require("dotenv").config({ path: "./config/.env" });

const { v4: uuidv4 } = require("uuid");

//const config = require("./config/config");
const database = require("./config/database");
const routes = require("./routes");
require("./passport/setup");

const HOST = "127.0.0.1";
const PORT = 3001;
const NODE_ENV = "development";

const SESS_NAME = "sid";
const SESS_SECRET =
  "This is my session secret that is impossible to guess so don't even try hacker";
const SESS_LIFETIME = 1000 * 60 * 60 * 24 * 7;

const IN_PROD = NODE_ENV === "production";

// Connect to mongoDB
let mongoDB = process.env.MONGODB_URI || database.url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

// Bodyparser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
  session({
    name: SESS_NAME,
    genid: (req) => {
      console.log("Inside the session middleware");
      console.log(req.sessionID);
      return uuidv4();
    },
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
    store: new MongoStore({
      mongooseConnection: db,
      secret: SESS_SECRET,
      touchAfter: 24 * 3600,
      autoRemove: "disabled",
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(
  "/",
  router.get("/", (req, res) => {
    res.send("You're looking for /api ;)");
  })
);
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
