var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');


passport.use(new LocalStrategy(
  function(username, password, done) {
    'use strict';

    //Hash password and check against stored hash for username
    // var hash = bcrypt.genSalt(password,
    //   (err, salt) => bcrypt.hash('B4c0/\/', salt,
    //     (err, hash) => console.log(hash)));
    if(username === 'me@here.com' && password === 'thecorrectpassword') {
      let dummyUser = {email:'me@here.com',name:'Joe Bloggs'};
      return done(null,dummyUser);
    } else {
      return done(null,false,{message: 'Incorrect password'});
    }
  }
));
