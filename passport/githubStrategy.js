const passport = require("passport");
const User = require('../models/User');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: '7736657a69fb7f93db97',
    clientSecret: '03cabf1c8ce406e2879f7500266543fcd405911d',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ githubId: profile.id })
      .then(user => {
        if (user) {
          return cb(null, user);
        } else {
          const newUser = new User({
            username: profile.username,
            name: profile.displayName,
            githubId: profile.id,
            avatar: profile.photos[0].value,
            forum: 'Web'
          });
          newUser.save((err) => {
            if (err) { return cb(err); }
            cb(null, newUser);
          });
        }
      })
      .catch(error => {
        return cb(error);
      });
  }
));
