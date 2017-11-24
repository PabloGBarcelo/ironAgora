require('dotenv').config();
const passport = require("passport");
const User = require('../models/User');
const SlackStrategy = require('passport-slack').Strategy;

passport.use(new SlackStrategy({
    clientID: process.env.slackClientId,
    clientSecret: process.env.slackClientSecret,
    callbackURL: process.env.slackCallbackURL,
    scope:  ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team']
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ slackId: profile.id })
      .then(user => {
        if (user) {
          return cb(null, user);
        } else {
          const newUser = new User({
            name: profile.displayName,
            email: profile.user.email,
            slackId: profile.id,
            avatar: profile.user.image_192,
            forum: 'UX'
          });

          newUser.save((err) => {
            if (err) { return cb(err); }
            cb(null, newUser);
          });
        }
      })
      .catch(err =>{
        return cb(err);
      });
  }
));
