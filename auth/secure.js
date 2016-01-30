//Middleware for securing routes or redirecting to login
module.exports = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    req.session.returnTo = req.path;
    res.redirect('/login');
};
