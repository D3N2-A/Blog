const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare.";
const aboutStartContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. ";
const contactStartContent =
  "Scelerisque eleifend donec pretium vulputate sapien. ";
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
let blogPosts = [];

app.get("/", function (req, res) {
  res.render("home", { homeContent: homeStartingContent, blogPush: blogPosts });
});

// <-------------Params------------>

app.get("/posts/:postName", function (req, res) {
  const postName = _.lowerCase(req.params.postName);

  blogPosts.forEach(function (element) {
    if (postName === element.title) {
      console.log("match found!");
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
  const post = {
    title: req.body.composeTitle,
    content: req.body.composeContent,
  };
  blogPosts.push(post);
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});
