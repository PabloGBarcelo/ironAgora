const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  res.render('error');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
}); 

module.exports = router;
