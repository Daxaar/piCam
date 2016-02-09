var express = require('express');
var router = express.Router();
var util = require('util');
var security = require('../auth-util.js');
var fs = require('fs');

router.use(security.ensureAuthenticated);

router.get('/', function(req, res, next){
  fs.stat('public/images/last.jpg',(err, stats) => {
    var modified = '';
    if(err){
      modified = err.code;
    } else {
      modified = stats.mtime;
    }
    res.render('last', {modified:modified});
  });
});

router.get('/file', function(req, res, next){

    res.header('Cache-Control','no-cache');
    var options = {
      root: './public/images/',
      dotfiles: 'deny',
      headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
      }
    };

  var fileName = 'last1.png';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.status(err.status).end();
    }

  });
});

module.exports = router;
