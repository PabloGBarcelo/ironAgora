const passport = require("passport");
const User = require('../models/User');
const SlackStrategy = require('passport-slack').Strategy;

passport.use(new SlackStrategy({
    clientID: '2432150752.275834354901',
    clientSecret: '1b8443b140f62b601d0cfbe105a7cbfb',
    callbackURL: "http://localhost:3000/auth/slack/callback",
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
      .catch(error =>{
        return cb(err);
      });
  }
));
