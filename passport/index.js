const passport = require("passport");
//require('./githubStrategy');
require('./mediumStrategy');
require('./serializers');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
