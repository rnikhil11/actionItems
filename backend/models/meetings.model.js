const mongoose = require("mongoose");

const MeetingsSchema = new mongoose.Schema(
  {
    meetingId: { type: String, unique: true },
    name: String,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meetings", MeetingsSchema);
