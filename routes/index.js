var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Process Manager' });
});

router.get('/view.ejs', function(req, res, next) {
  res.render('view', { title: 'Process Manager' });
});

module.exports = router;
