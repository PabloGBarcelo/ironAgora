const passport = require("passport");
const User = require('../models/User');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.githubClientId,
    clientSecret: process.env.githubClientSecret,
    callbackURL: process.env.githubCallbackURL
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
