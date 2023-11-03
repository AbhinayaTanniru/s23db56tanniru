var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('flower', { title: 'Search Results flowers' });
});

module.exports = router;

