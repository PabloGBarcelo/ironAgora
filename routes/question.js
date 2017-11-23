const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Question = require('../models/Question');

router.get('/new', ensureLoggedIn('/'), (req, res, next) => {
  console.log(req.user);
  res.render('question/new', { medium: 1});
});

router.post('/new', ensureLoggedIn('/'), (req, res, next) => {

  let mainPhoto = req.body.myPost.split(/img src="/)[1].split(/"/)[0];
  let newQuestion = new Question ({
    title: req.body.myTitle,
    content: req.body.myPost,
    _authorId: req.user.id,
    attachments: "",
    tags: "",
    mainPhoto,
    // forum: { type: String, enum:['UX','Web'], default: 'UX' },
    isClosed: false,
    isSurvey: false
  });
  newQuestion.save((err) =>{
    res.redirect('/forum');
  });
});

router.get('/:id/show', ensureLoggedIn('/'), (req, res, next) => {
  Question.findById(req.params.id)
          .then((results) => res.render('question/show',  { results, user: req.user } ))
          .catch((err) => console.log(err));
});

router.get('/:id/edit', ensureLoggedIn('/'), (req, res, next) => {
  Question.findById(req.params.id)
          .then((results) => res.render('question/edit', { medium: 1, results}))
          .catch((err) => console.log(err));
});

router.post('/:id/edit', ensureLoggedIn('/'), (req, res, next) => {
  let mainPhoto = req.body.myPost.split(/img src="/)[1].split(/"/)[0];
  let editPost = {
    title: req.body.myTitle,
    content: req.body.myPost,
    mainPhoto
  };
  Question.findByIdAndUpdate(req.params.id, editPost)
          .then((results) => res.redirect('/forum/'))
          .catch((err) => console.log(err));
});

module.exports = router;
