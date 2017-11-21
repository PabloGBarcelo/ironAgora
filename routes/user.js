const express = require('express');
const router = express.Router();
//const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './uploads/user' });
const User = require('../models/User');


router.get('/', (res, req, next) => {
  res.render('user/info');
});

router.get('/edit', (req, res, next) => {
  res.render('user/edit', req.user);
});

router.post('/edit/:id', upload.single('avatar'), (req, res, next) => {
  let userInfo = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    avatar:
  };

  User.findByIdAndUpdate(req.user._id, userInfo)
    .then(user => {
      res.redirect('/user');
    })
    .catch(error => {
      return next(error);
    });
});

module.exports = router;
