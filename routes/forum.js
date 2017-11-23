const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const moment = require('moment');
const Question = require('../models/Question');

router.get('/', ensureLoggedIn('/'), (req, res, next) => {
  Question.find({}, null, {sort: {created_at: -1}}) // desc
          .populate('_authorId')
          .exec()
          .then((results) => { res.render('forum/index', {results, moment} ); })
          .catch((err) => console.log(err));
});

router.get('/check', ensureLoggedIn('/'), (req, res, next) => {
  Question.find()
          .then(results => {
            let JSONdata = JSON.stringify({results});
            // console.log(JSONdata);
            res.send(JSONdata); })
          .catch((err) => console.log(err));
});

module.exports = router;
