var mongoose = require("mongoose");
var Patentcategory = new mongoose.Schema({

  category: {
    type: String,
  },
});
module.exports = mongoose.model("Patentcategory", Patentcategory);
