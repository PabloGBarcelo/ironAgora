module.exports = function (user) {
  return (req, res, next) => {
    if (user !== req.user) {
      backURL = req.header('Referer') || '/';
      res.redirect(backURL);
    } 
  }
};
