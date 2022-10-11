var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Heena' });
});


router.get('/home', function(req, res, next) {
  res.render('home', { fname: 'Heena', lname:'Vaidya' });
});

module.exports = router;
