const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_BASE_URL = 'http://learn.ironhack.com/api';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/auth/medium',
  passport.authenticate('medium', { scope: ['profile'] }));

app.get('/auth/medium/callback',
  passport.authenticate('medium', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.get('/login', (req, res, next) => {
  
});

module.exports = router;
