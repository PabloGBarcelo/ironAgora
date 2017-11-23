const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const moment = require('moment');
const Question = require('../models/Question');
const mainTagsSearch = require('../utils/mainTagsSearch');

router.get('/', ensureLoggedIn('/'), (req, res, next) => {
  Question.find({}, null, { sort: { created_at: -1 }}) // desc
    .populate('_authorId')
    .exec()
    .then(results => {
      let mainTags = mainTagsSearch(results);
      res.render('forum/index', {results, mainTags, moment});
    })
    .catch(error => {
      console.log('Error ocurred while fetching posts');
    });
});

router.get('/tag/:id', (req, res, next) => {
  let tag = req.params.id;
  Question.find({ tags: { "$regex": tag, "$options": "i" } }, (error, results) => {
    res.render('forum/index', {results, mainTags: [tag], moment});
  });
});

router.get('/check', ensureLoggedIn('/'), (req, res, next) => {
  Question.find()
    .then(results => {
      let JSONdata = JSON.stringify({results});
      res.send(JSONdata);
    })
    .catch(error => {
      console.log('Error ocurred while fetching data');
    });
});

module.exports = router;
