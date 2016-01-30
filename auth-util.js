//var liveStrategy = require('../auth/live');
//var localStrategy = require('../auth/local');
//var passport = require('passport');

module.exports = {
  ensureAuthenticated : function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.session.returnTo = req.originalUrl;
    res.redirect('/login');
  }
};
