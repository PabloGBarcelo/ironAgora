const express = require('express');
const router = express.Router();
const Question = require('../models/Question')

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
    tags: "",
    mainPhoto,
    // forum: { type: String, enum:['UX','Web'], default: 'UX' },
    isClosed: false,
    isSurvey: false
  });
  newQuestion.save((err) =>{
    res.redirect('/forum')
  });
});

module.exports = router;
