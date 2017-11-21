const express = require('express');
const axios = require('axios');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/login', (req, res, next) => {
});

module.exports = router;
