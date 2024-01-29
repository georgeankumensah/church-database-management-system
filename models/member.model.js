const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  gender: String,
  date_of_birth: Date,
  contact_info: {
    email: String,
    phone: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    digitalAddress: String,
  },
  joining_date: Date,
  baptism_date: Date,
  marital_status: String,
  spouse: {
    first_name: String,
    last_name: String,
  },
  children: [
    {
      first_name: String,
      last_name: String,
      date_of_birth: Date,
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  events_attended: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  roles: [
    {
      type: String,
      enum: ["Member", "Leader", "Pastor"],
      default: "Member",
    },
  ],
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
