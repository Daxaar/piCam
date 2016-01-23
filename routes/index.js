var express = require('express');
var router = express.Router();
var security = require('../auth-util.js');

router.get('/login',(req,res) => {
  res.render('login');
});

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/last',function(req, res, next){
    res.render('last',{time: new Date().getDate()});
});

router.get('/lastfile', security.ensureAuthenticated, function(req, res, next){

    res.header('Cache-Control','no-cache');
    var options = {
    root: './public/images/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = 'last.png';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.status(err.status).end();
    }
  });
});

module.exports = router;
