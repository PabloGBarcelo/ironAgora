const passport = require("passport");
const User = require('../models/User');

passport.serializeUser((user, cb) => {
  console.log("SERIALIZER",user);
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    console.log("DESERIALIZER",user);
    cb(null, user);
  });
});
