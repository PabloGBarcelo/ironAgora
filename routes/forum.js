const express = require('express');
const router = express.Router();
const Question = require('../models/Question')

router.get('/', (req, res, next) => {
<<<<<<< HEAD
  console.log(req.user);
  res.render('forum/index');
=======
  Question.find({})
          .populate('_authorId')
          .exec()
          .then((results) => { res.render('forum/index', {results} )})
          .catch((err) => console.log(err))
>>>>>>> ea53babd2b116be3b40263aba563adceb50c26c3
});

module.exports = router;
