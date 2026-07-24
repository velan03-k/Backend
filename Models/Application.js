const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
  type: String,
  enum: [
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
    "Rejected",
    "Rescheduled",
  ],
  default: "Pending",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);