const express = require('express');
const router = express.Router();
//const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './uploads/user' });
const User = require('../models/User');


router.get('/list',(req, res, next) => {
  User.find({ forum: req.user.forum })
    .then(users => {
      console.log(users);
      res.render('user/list', {users});
    })
    .catch(error => {
      res.render('error', error);
    });
});

router.get('/edit/:id', (req, res, next) => {
  res.render('user/edit', req.user);
});

router.post('/edit/:id', (req, res, next) => {
  res.render('user/edit', req.user);
});

//router.post('/edit/:id', upload.single('avatar'), (req, res, next) => {
//  let userInfo = {
//    username: req.body.username,
//    name: req.body.name,
//    email: req.body.email,
//    avatar:
//  };
//
//  User.findByIdAndUpdate(req.user._id, userInfo)
//    .then(user => {
//      res.redirect('/user');
//    })
//    .catch(error => {
//      return next(error);
//    });
//});

router.get('/:id', (req, res, next) => {
  //console.log(res.locals.user);
  //console.log(req.user);
  User.findOne({ '_id': req.params.id })
    .then(user => {
      res.render('user/info', res.locals.user);
    })
    .catch(error => {
      res.render('error', error);
    });
});

module.exports = router;
