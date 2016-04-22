var Post = require('../models/post.js');

module.exports = {
  get: function(req, res, next) {

    Post.find()
      .then(function(posts) {
        if (!posts) {
          res.status(200);
          res.json([]);
        }

        res.status(200);

        res.json({
          data: posts
        });
      });

  },

  post: function(req, res, next) {
    var post = new Post({
      message :  req.body.message,
      userName : req.body.userName
    });

    post.save(function(err, saved) {
        if (err) {
          next(err);
        }
        res.status(200);
        res.json(saved);
      },
      function(err) {
        next(err);
      });

    res.status(200);
  }
}