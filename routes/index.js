var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.app.get('mysql');
  db.query('SELECT * FROM article', function(error, results, fields){
    if (error) { 
      res.send(500);
      return;
    };
    res.render('index', { title: '文章列表', list : results });
  });
 
});

module.exports = router;
