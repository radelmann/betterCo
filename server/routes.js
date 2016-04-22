var api = require('./controllers/comment.js');
var sanitize = require('mongo-sanitize');

var cleanInput = function(req, res, next) {
  req.body = sanitize(req.body);
  next();
}

module.exports = function(app) {
  app.get('/api/get', api.get);
  app.post('/api/post', cleanInput, api.post);
}