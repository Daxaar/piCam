var express = require('express');
var router = express.Router();
var security = require('../auth-util.js');
var fs = require('fs');

router.get('/',
  (req, res, next) => res.render('index', { title: 'My Express App' }));

router.get('/logout', (req,res) => res.redirect('/auth/logout'));
router.get('/login',(req,res) => res.render('login'));
router.get('/dev',(req,res) => res.render('dev'));

module.exports = router;
