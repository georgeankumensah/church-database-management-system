const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  description: String,
  attendees: [
    {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
      },
      attended: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
