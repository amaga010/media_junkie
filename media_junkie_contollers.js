//Require
var express = require('express');
var router = express.Router();
var burger = require('../models/mediajunkie.js');

//Routes
router.get('/', function (req, res) 
{
  res.redirect('/index');
});
 
router.get('/index', function (req, res) 
{
  burger.selectAll(function(data) 
  {
    var hbsObject = { mediajunkie: data };
    
    res.render('index', hbsObject);
  });
});

//Export
module.exports = router;