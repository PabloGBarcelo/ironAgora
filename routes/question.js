const express = require('express');
const router = express.Router();

router.get('/new', (req, res, next) => {
  res.render('question/new', { medium: 1 });
});

module.exports = router;
