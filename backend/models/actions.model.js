const mongoose = require("mongoose");
const ActionsSchema = new mongoose.Schema(
  {
    username: String,
    actionItems: String,
    startDate: String,
    effortInDays: Number,
    estCompletionDate: String,
    actualCompletionDate: String,

    priority: String,
    progress: Number,
    status: { type: String, default: "Not started" },
    environment: String,
    meetingId: String,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Actions", ActionsSchema);
