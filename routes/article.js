var express = require('express');
var router = express.Router();

function getLocalTime(nS) {     
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0,17)} 

/* GET home page. */
router.get('/:id', function(req, res, next) {
  
  var id = req.params.id;
  if (id) {
    var db = req.app.get('mysql');
    db.query('SELECT * FROM article WHERE id = ?', [id], function(error, results, fields){
      if (results.length < 0) {
        res.send(404,'信息不存在');
        return;
      } else {
        var article = results[0];

        res.render('article', {
          title : article.title,
          author : article.author,
          content : article.content
        });
      }
    });
  }
  else {
    res.send(404,'信息不存在');
  }
});

module.exports = router;
