var comment = require('./controllers/comment.js');

var sanitize = require('mongo-sanitize');

var cleanInput = function(req, res, next) {
  req.body = sanitize(req.body);
  next();
}

module.exports = function(app,passport) {
  //comment routes
  app.get('/comment', comment.get);
  app.post('/comment', cleanInput, comment.post);


  //auth routes
  var user = require('./controllers/user.js')(passport);
  app.post('/register', cleanInput, user.register);
  app.post('/login', cleanInput, user.login);
  app.post('/isAuth', user.isAuth);
}