var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if (!req.session.user) {
    res.send('未登陆, 请<a href="/admin/signin">登陆</a>');
  }
  else {
    res.render('./admin/publish',{title : '发布文章'});
  }

  // res.render('./admin/publish', { title: 'Express' });
});


router.post('/', function(req, res, next){
  var body = req.body;
  var session = req.session;
  console.log(body);
  if (!session.user) {
    res.send('未登陆, 请<a href="/admin/signin">登陆</a>');
  }
  else{

    if (body.title && (body.title.replace(/(^\s+)|(\s+$)/g,'') == '')) {
      res.send('文章标题不能为空');
      return;
    };
    if (body.content && (body.content.replace(/(^\s+)|(\s+$)/g,'') == '')) {
      res.send('文章正文不能为空');
      return;
    };

    var db = req.app.get('mysql');
    db.query('INSERT INTO article SET ?',{
      title : body.title,
      articledate : (new Date()).getTime(),
      createdate : (new Date()).getTime(),
      author : session.user.uname,
      content : body.content
    },function(error, results, fields){
      if (error) { 
          res.send(500);
          return;
        };
        res.send('发布成功');
    });
  }
});

module.exports = router;