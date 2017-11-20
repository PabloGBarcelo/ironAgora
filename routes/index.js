const express = require('express');
const axios = require('axios');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
  axios.get('http://learn.ironhack.com/api/user')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
