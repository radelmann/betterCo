var api = require('./controllers/comment.js');

module.exports = function(app) {
  app.get('/api/get', api.get);
  app.post('/api/post', api.post);
}