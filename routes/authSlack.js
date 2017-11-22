const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/slack', passport.authenticate('slack'));

router.get('/slack/callback',
  passport.authenticate('slack', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/forum');
});

module.exports = router;
