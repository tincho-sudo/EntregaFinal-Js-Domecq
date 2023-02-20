const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaderSchema = new Schema({
  name: {
    type: String,
  },
  score: {
    type: Number,
  },
});

const LeaderModel = mongoose.model("Leader", LeaderSchema);
module.exports = LeaderModel;
