const mongoose = require("mongoose");
const UserActionsSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    actionItems: String,
    startDate: String,
    effortInDays: Number,
    estCompletionDate: String,
    actualCompletionDate: String,

    priority: String,
    progress: Number,
    status: { type: String, default: "Not started" },
    environment: String,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserActions", UserActionsSchema);
