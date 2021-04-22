// Creating, editing stories routes are under stories.js
const express = require("express");
const router = express.Router();
const { ensureGuest, ensureAuth } = require("../controller/auth");
