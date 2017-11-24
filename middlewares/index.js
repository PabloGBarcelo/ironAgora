const Question = require('../models/Question');

module.exports = function (postId) {
  return (req, res, next) => {
    Question.findOne({'_id': postId}, { '_authorId': 1, '_id': 0 })
      .then(authorId => {
        if (authorId !== req.user.id) {
          backURL = req.header('Referer') || '/';
          res.redirect(backURL);
        }
      })
      .catch(error => {
        console.log('Error while fetching data');
      });

  };
};
