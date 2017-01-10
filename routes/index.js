var express = require('express');
var router = express.Router();
var indexData = require('../data/data.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', indexData.indexObj);
});

module.exports = router;
