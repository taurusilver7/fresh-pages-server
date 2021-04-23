// A google strategy to create the passport strategy to create routes & redirects.

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, calbck) => {
        // console.log(profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            calbck(null, user);
          } else {
            user = await User.create(newUser);
            calbck(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, calbck) => {
    calbck(null, user.id);
  });

  passport.deserializeUser((id, calbck) => {
    User.findById(id, (err, user) => {
      calbck(err, user);
    });
  });
};
