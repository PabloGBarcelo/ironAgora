const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('forum/index');
});

module.exports = router;
