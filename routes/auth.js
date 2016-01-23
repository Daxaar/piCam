var express = require('express');
var router = express.Router();
var passport = require('passport');
var util = require('util');
//var security = require('../auth-util');

router.get('/clear',(req,res) => {
    //passport.session
});

router.get('/windowslive',
  passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic'] }), 
    function(req, res){
    // The request will be redirected to Windows Live for authentication, so
    // this function will not be called.
  });

/*This route is registered in the configuration screen on windows live*/
router.get('/windowslive/callback',
  passport.authenticate('windowslive', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
});

module.exports = router;
