var express = require("express");
var router = express.Router();
var users = require("./model/userModel");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Rubin" });
});

router.post("/login", async (req, res, next) => {
  var user = new users({
    username: req.body.username,
    password: req.body.password,
  });
  var response = await user.save();
  if (response) {
    console.log("successfully inserted");
  }
  console.log("some error occured");
});

module.exports = router;
