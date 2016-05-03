module.exports.ensureIsAdmin = function (redirectTo) {
  return function (req, res, next) {
    if (req.isAdmin) {
      next();
    } else {
      req.flash('flash', 'Access denied !');
      return res.redirect(redirectTo);
    }
  };
};
