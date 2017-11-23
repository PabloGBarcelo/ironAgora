const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const moment = require('moment');
const Question = require('../models/Question');

router.get('/', ensureLoggedIn('/'), (req, res, next) => {
  Question.find({}, null, { sort: { created_at: -1 }}) // desc
    .populate('_authorId')
    .exec()
    .then(results => {
      let allTags = {};
      results.forEach(post => {
        post.tags[0].split(',').forEach(tag => {
          let tagUp = tag.toUpperCase();
          if (!allTags[tagUp] && tagUp !== '') {
            allTags[tagUp] = 1;
          } else if (tagUp !== '') {
            allTags[tagUp]++;
          }
        });
      });

      let mainTags = Object.keys(allTags);
      mainTags.sort((keyOne, keyTwo) => {
        return allTags[keyTwo] - allTags[keyOne];
      }).splice(8);

      res.render('forum/index', {results, mainTags, moment});
    })
    .catch(error => {
      console.log('Error ocurred while fetching posts');
    });
});

router.get('/tag/:id', (req, res, next) => {
  Question.find({ tags: { "$regex": req.params.id, "$options": "i" } }, (error, results) => {
    res.render('forum/index', {results, mainTags: [], moment})
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
