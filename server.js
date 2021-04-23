const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphnds = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const connectDB = require("./config/db");

// load env config
dotenv.config({ path: "./config/config.env" });

// passport config
require("./config/passport")(passport);

// database config
connectDB();

//^^^^^^ app config  ^^^^^//
const app = express();

// body-parser config
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// req log data
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// templates- handlebars
app.engine(".hbs", exphnds({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// express sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
// passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// config static folder [directory]
app.use(express.static(path.join(__dirname, "public")));

// api routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

// middlewares

// listeners
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
