const passport = require("passport");
const User = require('../models/User');
const MediumStrategy = require('passport-medium').Strategy;

passport.use(new MediumStrategy({
    clientID: MEDIUM_CLIENT_ID,
    clientSecret: MEDIUM_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/medium/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ mediumId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
