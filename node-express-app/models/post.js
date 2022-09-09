// DEPENDENCIES
const mongoose = require('mongoose');

// SCHEMA
const PostSchema  = new mongoose.Schema({
  name: String,
  desc: String,
  img_url: {
      type  : String,
      required : true
  }
});

// MODEL
const Post = mongoose.model('Post', PostSchema);

// EXPORT
module.exports = Post;