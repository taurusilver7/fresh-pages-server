// Creating, editing stories routes are under stories.js
const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../controller/auth");

const Story = require("../models/Story");

/*
@desc    Show add page
@route  GET /stories/add
*/
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});

module.exports = router;
