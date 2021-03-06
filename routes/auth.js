// Login & redirect after login routes are under auth.js
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Authentication Requests to GoogleAuth using passport

/*
@desc    Auth with Google
@route  GET /auth/google
*/
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

/*
@desc    Google auth callback
@route  GET /auth/google/callback
*/
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

/*
@desc    Logout user
@route  GET /auth/logout
*/
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
