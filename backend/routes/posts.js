const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post Added Successfully',
      postId: result._id
    });
  });

});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    ttile: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Post Updated"});
  });
});

router.get('' ,(req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize*(currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(doc => {
    fetchedPosts = doc;
    return Post.count();
  }).then(count => {
    res.status(200).json({
      message: "Post Fetched Successfully",
      posts: fetchedPosts,
      maxPosts: count
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post Deleted Successfully'
    });
  });

});

module.exports = router;
