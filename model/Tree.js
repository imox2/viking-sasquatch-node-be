const mongoose = require("mongoose");

const treeSchema = new mongoose.Schema({
  data: String
});

const Tree = mongoose.model("Tree",treeSchema);
module.exports = Tree;