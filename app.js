const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require("connect-flash");

const indexRoutes = require('./routes/index');
const authGithub = require('./routes/authGithub');
const authSlack = require('./routes/authSlack');
const forumRoutes = require('./routes/forum');
const questionRoutes = require('./routes/question');
const userRoutes = require('./routes/user');
const answerRoutes = require('./routes/answer');

const app = express();

// connection to mongodb
const dbURL = 'mongodb://localhost/second-project';
mongoose.connect(dbURL).then(() => {
  console.log(dbURL);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(layouts);

// session and current user
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(flash());
require('./passport')(app);

app.use((req,res,next) => {
  res.locals.title = "IronAgora";
  res.locals.user = req.user;
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true,
                                parameterLimit: 100000,
                                limit: '50mb'}));

// front libraries to require in layout html file
app.use('/dist/axios', express.static(path.join(__dirname, 'node_modules/axios/dist')));
app.use('/dist/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/dist/medium-editor', express.static(path.join(__dirname, '/node_modules/medium-editor/dist')));
app.use('/dist/handlebars', express.static(path.join(__dirname, 'node_modules/handlebars/dist')));
app.use('/dist/blueimp-file-upload', express.static(path.join(__dirname, 'node_modules/blueimp-file-upload/js')));
app.use('/dist/medium-editor-insert-plugin', express.static(path.join(__dirname, 'node_modules/medium-editor-insert-plugin')));
app.use('/dist/medium-editor', express.static(path.join(__dirname, 'node_modules/medium-editor/dist')));
app.use('/dist/jquery-sortable', express.static(path.join(__dirname, 'node_modules/jquery-sortable/source/js')));
app.use('/dist/materialize', express.static(path.join(__dirname, 'node_modules/materialize-css/dist')));

app.use(express.static(path.join(__dirname, 'public')));

// controllers
app.use('/', indexRoutes);
app.use('/auth', authGithub);
app.use('/auth', authSlack);
app.use('/forum', forumRoutes);
app.use('/forum', questionRoutes);
app.use('/forum', answerRoutes);
app.use('/user', userRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
