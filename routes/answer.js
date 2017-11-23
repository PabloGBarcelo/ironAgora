const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');

router.post('/:id/newAnswer', (req, res, next) => {

  let newAnswer = new Answer ({
      _idQuestion: req.params.id,
      content: req.body.answer,
      attachments: "",
      _authorId: req.user.id
  });
  newAnswer.save((err) =>{
    res.redirect(`/forum/${req.params.id}/show`);
  });
});

router.post('/:id/removeAnswer', (req, res, next) => {
  let removeComment ={
    content: "- message deleted by user -"
  };
  Answer.findByIdAndUpdate(req.params.id,removeComment)
        .then(() => res.redirect(`/forum/${req.query.fromStory}/show`))
        .catch((err) => console.log(err));
});
module.exports = router;
