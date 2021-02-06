const mongoose = require("mongoose");
const actionSchema = new mongoose.Schema({
  username: String,
  actionItems: String,
  startDate: String,
  effortInDays: Number,
  estCompletionDate: String,
  priority: String,
  progress: Number,
  status: { type: String, default: "Not started" },
  environment: String,
});
const MeetingsSchema = new mongoose.Schema(
  {
    actionItems: {
      type: [actionSchema],
      default: [],
    },
    meetingId: { type: String, unique: true },
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meetings", MeetingsSchema);
