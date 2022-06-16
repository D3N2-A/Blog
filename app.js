const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser, urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started at port 3000");
});
