// All routes in the top-level for the api are routed here [dashboard, home..,]
const express = require("express");
const router = express.Router();

/*
@desc    Login/landing page
@route  GET /
*/
router.get("/", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

/*
@desc    Dashboard
@route  GET /dashboard
*/
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
