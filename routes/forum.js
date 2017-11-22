const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

router.get('/', (req, res, next) => {
  console.log(req.user);
  Question.find({}, null, {sort: {created_at: -1}}) // desc
          .populate('_authorId')
          .exec()
          .then((results) => { res.render('forum/index', {results, user:req.user} );})
          .catch((err) => console.log(err));
});

module.exports = router;
