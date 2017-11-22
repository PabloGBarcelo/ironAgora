const express = require('express');
const router = express.Router();

router.get('/new', (req, res, next) => {
  console.log(req.user);
  res.render('question/new', { medium: 1});
});

router.post('/new', (req, res, next) => {

});

module.exports = router;
