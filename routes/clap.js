const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

const Clap = require('../models/Clap');

router.get('/:id', (req, res, next) => {

  const clapInfo = {

  }
  
  let questionId = req.params.id;
  let userId = req.user.id;
  Clap.save

});
