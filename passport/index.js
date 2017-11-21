const passport = require("passport");
require('./githubStrategy');
require('./slackStrategy');
require('./serializers');

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
