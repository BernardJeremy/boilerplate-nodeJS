var flash = require('connect-flash');

module.exports = function (app) {
  app.use(flash());

  app.use(function (req, res, next) {
    res.locals.flash = req.flash('flash');
    next();
  });
};
