const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: String,
    description: String,
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    }],
    meeting_schedule: String,
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member'
    }
  });


  const Group = mongoose.model('Group', groupSchema);

  module.exports = Group