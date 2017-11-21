const passport = require("passport");
const User = require('../models/User');
const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: '7736657a69fb7f93db97',
    clientSecret: '03cabf1c8ce406e2879f7500266543fcd405911d',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //  return cb(err, user);
    //});
    User.findOne({ githubId: profile.id }, (err, user) => {
      console.log('Checking user');
      if (err) { return cb(err); }
      if (user) { return cb(null, user); }

      console.log('Creating new user');
      const newUser = new User({
        username: profile.username,
        name: profile.displayName,
        githubId: profile.id,
        avatar: profile.photos[0].value,
        forum: 'Web'
      });

      console.log('Saving new user');
      newUser.save((err) => {
        if (err) { return cb(err); }
        cb(null, newUser);
      });
    });
  }
));

//User.find({ email })
//   .then(user => {
//     if (!user) { throw new Error(`There isn't an account with email ${email}.`); }
//     if (!bcrypt.compareSync(password, user.password)) {
//       req.session.currentUser = user;
//       res.redirect('/');
//     } else {
//       throw new Error('Invalid password');
//     }
//     req.session.currentUser = user;
//     res.redirect('/');
//   })
//   .catch(error => {
//     return res.render('auth/login', {
//       errorMessage: error.message
//     });
//   });
