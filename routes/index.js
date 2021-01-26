var express = require("express");
var router = express.Router();
var users = require("./model/userModel");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Rubin" });
});

router.post("/register", async (req, res, next) => {
  var user = new users({
    username: req.body.username,
    password: req.body.password,
  });
  var response = await user.save();
  console.log(response);
  if (response) {
    res.status(200).json({ message: "success" });
  } else {
    res.status(401).json({ status: "failed" });
  }
});
router.get("/login", async (req, res, next) => {
  try {
    //validation
    if (!req.body.username || !req.body.password)
      return res.status(400).json({
        status: false,
        message: "Validation Failed",
      });

    const user = await users.findOne({
      username: req.body.username,
    });
    console.log(user);
    if (!user)
      return res.status(404).json({
        status: false,
        message: "User does not exist",
      });
    const pwdMatch = await bcrypt.compare(req.body.password, user.password);

    if (!pwdMatch)
      return res.status(401).json({
        status: false,
        message: "Password Incorrect",
      });

    const token = jwt.sign(
      { userid: user._id, username: user.username },
      process.env.SECRET_CODE,
      { expiresIn: "1d" }
    );
    res.header("auth-token", token).send(token);
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong",
      data: err,
    });
  }
});

module.exports = router;
