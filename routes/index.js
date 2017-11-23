const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/* GET home page. */
router.get('/', ensureLoggedIn('/forum'), (req, res, next) => {
  res.render('index');
});

router.get('/logout', ensureLoggedIn('/'), (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
