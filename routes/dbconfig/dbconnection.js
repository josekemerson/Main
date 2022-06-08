const mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config();
const connect = function() {
  const url = process.env.MONGO_URLll;
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  };

  mongoose.connect(url, options).then(async (db, err) => {
    if (err) console.log("err connecting to db", err);
    console.log("connected to DB!!");
  });
};

module.exports.connect = connect;
