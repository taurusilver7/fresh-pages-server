// All routes in the top-level for the api are routed here [dashboard, home..,]
const express = require("express");
const router = express.Router();
const { ensureGuest, ensureAuth } = require("../controller/auth");

const Story = require("../models/Story");

/*
@desc    Login/landing page
@route  GET /
*/
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

/*
@desc    Dashboard
@route  GET /dashboard
*/
router.get("/dashboard", ensureAuth, async (req, res) => {
  // console.log(req.user);
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.displayName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
