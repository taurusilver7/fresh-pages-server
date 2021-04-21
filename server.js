const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphnds = require("express-handlebars");

const connectDB = require("./config/db");

// load env config
dotenv.config({ path: "./config/config.env" });

// database config
connectDB();

//^^^^^^ app config  ^^^^^//
const app = express();

// req log data
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// templates- handlebars
app.engine(".hbs", exphnds({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// config static folder [directory]
app.use(express.static(path.join(__dirname, "public")));

// api routes
app.use("/", require("./routes/index"));

// middlewares

// listeners
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
