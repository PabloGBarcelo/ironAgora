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
    let postClaps = claps.filter(clap => { return clap._idQuestion == req.params.id; });
    let JSONdata = JSON.stringify({ claps: postClaps.length });
    res.send(JSONdata);
  });
});

module.exports = router;
