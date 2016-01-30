//Windows Live Passport Strategy with keys pulled from uncommited source
var passport = require('passport');
var keys = require('../secret/authkeys');
var WindowsLiveStrategy = require('passport-windowslive').Strategy;

module.exports = function (){

    passport.use(new WindowsLiveStrategy({
        clientID: keys.windowslive.id,
        clientSecret: keys.windowslive.secret,
        callbackURL: "http://node.octono.com:3000/auth/windowslive/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
        return done(null, profile);
        });
    }
  ));
};
