const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true}, //default: 'Hello'
  content: {type: String}
});

module.exports = mongoose.model('Post', postSchema);
