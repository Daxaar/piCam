var express = require('express');
var router = express.Router();
var security = require('../auth-util.js');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Express App', user: {name:'Darren'}});
});

router.get('/logout',(req,res) => res.redirect('/auth/logout'));
router.get('/login',(req,res) => res.render('login'));

module.exports = router;
