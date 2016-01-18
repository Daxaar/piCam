var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('util');
var WindowsLiveStrategy = require('passport-windowslive').Strategy;
var security = require('../auth-util');
var keys = require('../secret/authkeys');

router.get('/test', security.ensureAuthenticated, function(req, res){
    res.send('the test page');
});

router.get('/windowslive',
  passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic'] }),
  function(req, res){
    // The request will be redirected to Windows Live for authentication, so
    // this function will not be called.
  });

router.get('/windowslive/callback',
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
});

router.get('/account', security.ensureAuthenticated, function(req, res){
    res.send('the account page');
  //res.render('account', { user: req.user });
});

router.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.


passport.serializeUser(function(user, done){
    done(null,user);
});

passport.deserializeUser(function(obj, done){
    done(null,obj);
});

passport.use(new WindowsLiveStrategy({
    clientID: keys.windowslive.id,
    clientSecret: keys.windowslive.secret,
    callbackURL: "http://node.octono.com:3000/auth/windowslive/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

module.exports = router;
