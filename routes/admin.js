var express = require('express');
var router = express.Router();

/* GET users listing. */

// 登陆页面
router.get('/', function(req, res, next) {
  res.render('./admin/signin',{title: '登陆'});
});
router.get('/signin', function(req, res, next) {
  res.render('./admin/signin',{title: '登陆'});
});

// 登陆页面
router.get('/signup', function(req, res ,next){
  res.render('./admin/signup',{title: '注册'});
});

// 登陆
router.post('/signin', function(req, res, next){
  var body = req.body;
  var db = req.app.get('mysql');
  console.log(body);
  console.log(req.session);
  if (req.session.user) {
    res.send('您已登陆');
    return;
  };
  db.query('SELECT * FROM admin_user WHERE uname = ? AND password = ?',[body.uname, body.pwd], function(error, results, fields){
    if (error) { 
      res.send(500);
      return;
    }
    if (results.length > 0) {
      var user = results[0];
      req.session.user = {
        id : user.id,
        uname : user.uname,
        nickname : user.nickname
      }
      res.send('登陆成功');
      // return;
    }
    else {
      res.send('登陆失败');
    }
  });
});

// 注册 没写验证逻辑
router.post('/signup', function(req, res, next){
  var body = req.body;
  var db = req.app.get('mysql');
  db.query('SELECT uname FROM admin_user WHERE uname = ?', [body.uname], function(error, results, fields){
    if (error) { 
      res.send(500);
      return;
    };
    console.log(results, fields);
    if (results.length > 0) {
      res.send('用户名已注册');
    }
    else {
      db.query('INSERT INTO admin_user SET ?', {
        uname : body.uname,
        password : body.pwd,
        createtime : (new Date()).getTime()
      }, function(error, results, fields){
        if (error) { 
          res.send(500);
          return;
        };
        res.send('注册成功,<a href="/admin/signup">点击去登陆</a>');
      });
    }
  });
});


router.post('/')

module.exports = router;