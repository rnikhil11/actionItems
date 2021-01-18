const mongoose = require("mongoose");

const FormDataSchema = new mongoose.Schema(
  {
    data: Array,
    formId: String,
    is_active: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FormData", FormDataSchema);
