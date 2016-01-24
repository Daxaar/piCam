var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/last',function(req, res, next){
    var options = {
    root: './public/images/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true,
        'cache-control':'no-cache'
    }
  };

  var fileName = 'last.jpg';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      res.status(err.status).end();
    }
  });
});
module.exports = router;
