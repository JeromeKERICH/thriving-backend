const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    stage: { type: String, required: true },
    goals: { type: String, required: true },
    challenges: { type: String },
    timeAvailability: { type: String, required: true },
    skills: [{ type: String }],
    interests: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);
