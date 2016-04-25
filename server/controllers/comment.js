var Comment = require('../models/comment.js');

module.exports = {
  get: function(req, res, next) {

    Comment.find()
      .then(function(comments) {
        if (!comments) {
          res.status(200);
          res.json([]);
        }

        res.status(200);
        res.json({'data':comments});
      });
  },

  post: function(req, res, next) {
    //santize user input
    
    var comment = new Comment({
      message :  req.body.message,
      userName : req.body.userName
    });

    comment.save(function(err, saved) {
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
  },

  delete: function(req, res, next) {

    Comment.find({_id:req.params.id})
      .then(function(comment) {
        if (!comment) {
          res.status(404);
        }

        Comment.remove(function(err,deleted) {
          if (err) {
            next(err);
          }
          res.status(200);
          res.json(deleted);
        });
      });
  },

}