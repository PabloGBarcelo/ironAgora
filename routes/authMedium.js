const express = require('express');
const passport = require('passport');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/medium',
  passport.authenticate('medium', { scope: ['profile'] })
);

router.get('/medium/callback',
  passport.authenticate('medium', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/forum');
});

module.exports = router;
