const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    content: Array,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", FormSchema);
