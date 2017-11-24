const express = require('express');
const router = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Clap = require('../models/Clap');

router.post('/:id', ensureLoggedIn('/'), (req, res, next) => {

  const newClap = new Clap({
    _idQuestion: req.params.id,
    _authorId: req.user.id,
  });

  newClap.saveAndFind((error, claps) => {
    if (error) { return next(error); }
    let JSONdata = JSON.stringify({claps: claps.length});
    res.send(JSONdata);
  });
});


//router.post('/:id', ensureLoggedIn('/'), (req, res, next) => {
//  let backURL = req.header('Referer') || '/';
//  console.log(backURL);
//
//  const newClap = new Clap({
//    _idQuestion: req.params.id,
//    _authorId: req.user.id,
//  });
//
//  newClap.save(error => {
//    if (error) { return next(error); }
//    res.redirect(backURL);
//  });
//});

module.exports = router;
