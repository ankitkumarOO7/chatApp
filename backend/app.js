const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const postsRoutes = require("./routes/posts");

const app = express();

mongoose
.connect('mongodb+srv://snocoder:snooker123@4@cluster0-iarvu.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
 .then(() => {
  console.log('Connected TO DB');
})
.catch(() => {
  console.log('Connection Failed');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
