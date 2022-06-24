const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();
const homeStartingContent =
  "This page shows all the blog posts in truncated format";
const aboutStartContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. ";
const contactStartContent =
  "Scelerisque eleifend donec pretium vulputate sapien. ";
mongoose.connect("mongodb://localhost:27017/blogDB");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
// let blogPosts = [];

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model("Post", postSchema);
const blank = new Post({});
app.get("/", function (req, res) {
  Post.find({}, (err, posts) => {
    res.render("home", { homeContent: homeStartingContent, blogPush: posts });
  });
});

// <-------------Params------------>

app.get("/posts/:postName", function (req, res) {
  const postName = _.lowerCase(req.params.postName);
  
  posts.forEach(function (el) {
    if (postName === el.title) {
      res.render("post", {
        titlePost: el.title,
        contentPost: el.content,
      });
    }
  });
});
app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutStartContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactStartContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

// <--------------------Post----------------------->

app.post("/", function (req, res) {
  const post = new Post({
    title: req.body.composeTitle,
    content: req.body.composeContent,
  });
  post.save();
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});
