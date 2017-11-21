const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require("express-session");
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require("connect-flash");

const indexRoutes = require('./routes/index');
const authMediumRoutes = require('./routes/authMedium');
const authGithub = require('./routes/authGithub');
const forumRoutes = require('./routes/forum');

const app = express();

const dbURL = 'mongodb://localhost/second-project';
mongoose.connect(dbURL).then(() => {
  console.log(dbURL);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(layouts);

// default value for title local
//app.locals.title = 'Express - Generated with IronGenerator';

// Authorization and session.js
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
require('./passport')(app);

app.use((req,res,next) => {
  res.locals.title = "IronAgora";
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/dist/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/auth', authMediumRoutes);
app.use('/auth', authGithub);
app.use('/forum', forumRoutes);

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
