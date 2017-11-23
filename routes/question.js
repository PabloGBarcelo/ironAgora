const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

router.get('/new', (req, res, next) => {
  console.log(req.user);
  res.render('question/new', { medium: 1});
});

router.post('/new', (req, res, next) => {

  let mainPhoto = req.body.myPost.split(/img src="/)[1].split(/"/)[0];
  let newQuestion = new Question ({
    title: req.body.myTitle,
    content: req.body.myPost,
    _authorId: req.user.id,
    attachments: "",
    tags: req.body.tags,
    mainPhoto,
    // forum: { type: String, enum:['UX','Web'], default: 'UX' },
    isClosed: false,
    isSurvey: false
  });
  newQuestion.save((err) =>{
    res.redirect('/forum');
  });
});

router.get('/:id/edit', (req, res, next) => {
  Question.findById(req.params.id)
          .then((results) => res.render('question/edit', { medium: 1, results}))
          .catch((err) => console.log(err));
});

router.post('/:id/edit', (req, res, next) => {
  let mainPhoto = req.body.myPost.split(/img src="/)[1].split(/"/)[0];
  let editPost = {
    title: req.body.myTitle,
    content: req.body.myPost,
    tags: req.body.tags,
    mainPhoto
  };
  Question.findByIdAndUpdate(req.params.id, editPost)
          .then((results) => res.redirect('/forum/'))
          .catch((err) => console.log(err));
});

router.get('/:id/show', (req, res, next) => {
  Question.findById(req.params.id)
          .then((results) => {
            Answer.find({_idQuestion: req.params.id })
            .populate('_authorId')
            .exec()
            .then((resultAnswer =>{
                res.render('question/show', {results,resultAnswer} );
            }))
            .catch((err) => console.log(err));
          ;})
          .catch((err) => console.log(err));
});

router.post('/:id/delete', (req, res, next) => {
  Question.findByIdAndRemove(req.params.id)
          .then(() => res.redirect('/forum/'))
          .catch((err) => console.log(err));
});

module.exports = router;
