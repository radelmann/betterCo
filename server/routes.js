var comment = require('./controllers/comment.js');

var sanitize = require('mongo-sanitize');

var cleanInput = function(req, res, next) {
  req.body = sanitize(req.body);
  next();
}

module.exports = function(app, passport) {
  var user = require('./controllers/user.js')(passport);

  //comment routes
  app.get('/comment', user.isAuth, comment.get);
  app.post('/comment', user.isAuth, cleanInput, comment.post);
  app.delete('/comment/:id', user.isAuth, comment.delete);


  //auth routes
  app.post('/register', cleanInput, user.register);
  app.post('/login', cleanInput, user.login);

  app.post('/isAuth', user.isAuth, function(req, res) {
    res.status(200);
    res.json({
      message: "Authorized"
    });
  });

  app.delete('/user', cleanInput, user.delete);
}