const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. ";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. ";
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { homeContent: homeStartingContent });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});
