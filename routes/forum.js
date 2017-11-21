const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('forum/index');
});

router.get('/forum/new', (req, res, next) => {
  res.render('forum/index');
});

router.get('/forumtest', (req, res, next) => {
  res.render('forum/index');
});

module.exports = router;
