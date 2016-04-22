var mongoose = require('mongoose');

// define the schema for our user model
var postSchema = mongoose.Schema({
  message: {
    type: String
  },
  userName: {
    type: String
  }
});

// create the model for users and expose it to our app
var Post = mongoose.model('Post', postSchema);
module.exports = Post;