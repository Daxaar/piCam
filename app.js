var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var uuid = require('uuid');

var local = require('./auth/local')();
var live = require('./auth/live')();
var secure = require('./auth/secure');

var auth = require('./routes/auth');
var routes = require('./routes/index');
var users = require('./routes/users');
var last = require('./routes/last');

var app = express();

// session
app.use(session({
  genid: function(req) {
    return uuid.v4();
  },
  secret: 'super secret keyboard cat on a mission'
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/secure', express.static(path.join(__dirname, 'public/secure')));
app.use('/fonts', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/fonts')));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serialize...');
  console.log(user);
  done(null,user);
});

passport.deserializeUser((obj, done) => {
  console.log('deserialize...');
  console.log(obj);
  done(null,obj);
});

app.use((req, res, next) => {
  res.locals.user = req.user || {};
  next();
});

app.use('/secure/*.jpg',secure);
app.use('/', routes);
app.use('/users', users);
app.use('/auth',auth);
app.use('/last',last);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
