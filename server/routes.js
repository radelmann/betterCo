var api = require('./controllers/api.js');

module.exports = function(app) {
  app.get('/api/get', api.get);
  app.post('/api/post', api.post);
}