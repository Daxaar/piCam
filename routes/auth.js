var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('util');
var bcrypt = require('bcrypt');
var security = require('../auth/strategies');
var liveStrategy = require('../auth/live')();
var localStrategy = require('../auth/local')();

router.post('/local',
            passport.authenticate('local'),
            (req,res) => res.redirect(req.session.returnTo || '/'));

router.get('/logout',(req,res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('You have logged out');
});

router.get( '/windowslive',
  passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic'] }),
  function(req, res){
    // The request will be redirected to Windows Live for authentication, so
    // this function will not be called.
});

/*This route is used in the configuration screen on windows live*/
router.get('/windowslive/callback',
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
});

function soon(req,res,next) {
  res.send('coming soon...');
}
router.get('/facebook',soon);
router.get('/twitter',soon);
router.get('/google',soon);

module.exports = router;
