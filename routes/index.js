var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/last',function(req, res, next){

  fs.stat('public/images/last.jpg',function (err, stats) {
    res.render('last', {modified:stats.mtime});
  });
  //   var options = {
  //   root: './public/images/',
  //   dotfiles: 'deny',
  //   headers: {
  //       'x-timestamp': Date.now(),
  //       'x-sent': true,
  //       'cache-control':'no-cache'
  //   }
  // };
  //
  // var fileName = 'last.jpg';
  // res.sendFile(fileName, options, function (err) {
  //   if (err) {
  //     res.status(err.status).end();
  //   }
  // });
});
module.exports = router;
