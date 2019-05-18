//Require
var express = require('express');
var router = express.Router();
var mediajunkie = require('../models/media_junkie.js');

//Routes
router.get('/', function (req, res) 
{
  res.redirect('/index');
});
 
router.get('/index', function (req, res) 
{
  mediajunkie.selectAll(function(data) 
  {
    var hbsObject = { mediajunkie: data };
    
    res.render('index', hbsObject);
  });
});

//Export
module.exports = router;

