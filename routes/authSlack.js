const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/slack', passport.authorize('slack'));

router.get('/slack/callback',
  passport.authorize('slack', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/forum');
});

module.exports = router;
