module.exports = {
  ensureAuthenticated : function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.session.returnTo = req.path;
    res.redirect('/auth/windowslive')
  }    
}