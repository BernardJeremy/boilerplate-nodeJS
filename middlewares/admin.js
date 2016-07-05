module.exports.ensureIsAdmin = function (redirectTo) {
  return function (req, res, next) {
    if (req.isAdmin) {
      next();
    } else {
      return res.redirect(redirectTo);
    }
  };
};
