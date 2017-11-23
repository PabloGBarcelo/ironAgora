const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const multer = require('multer');
const upload = multer({ dest: './uploads/user' });
const User = require('../models/User');
const Question = require('../models/Question');


router.get('/list', ensureLoggedIn('/'), (req, res, next) => {
  User.find({ forum: req.user.forum })
    .then(users => {
      res.render('user/list', {users});
    })
    .catch(error => {
      res.render('error', error);
    });
});

router.get('/question', ensureLoggedIn('/'), (req, res, next) => {
  Question.find({ '_authorId': req.user._id }, { sort: { 'created_at': -1 }})
    .then(questions => {
      res.render('user/info', { user: req.user, questions });
    })
    .catch(error => {
      res.render('error', error);
    });
});

router.get('/edit/:id', ensureLoggedIn('/'), (req, res, next) => {
  res.render('user/edit', req.user);
});

router.post('/edit/:id', [ensureLoggedIn('/'), upload.single('avatar')], (req, res, next) => {
  let userInfo = {
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    avatar: `/uploads/user/${req.file.filename}`
  };

  User.findByIdAndUpdate(req.user._id, userInfo)
    .then(user => {
      res.redirect(`/user/${req.user._id}`);
    })
    .catch(error => {
      return next(error);
    });
});

router.get('/:id', ensureLoggedIn('/'), (req, res, next) => {
  User.findOne({ '_id': req.params.id })
    .then(user => {
      Question.find({_authorId: req.user.id}, null, {sort: {created_at: -1}})
              .then(questions => {
                res.render('user/info', { user: req.user, questions });
              })
              .catch(error => {
                console.log(error);
              });
    })
    .catch(error => {
      res.render('error', error);
    });
});

module.exports = router;
