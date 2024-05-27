const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const activityData = new mongoose.Schema({
  activity_id: Number,
  exercise_name: String,
  user_id: Number,
  distance: { type: Number, default: 0 },
  activity_duration: Date,
  created_at: { type: Date, default: Date.now() },
  completed_at: Date,
});

activityData.plugin(AutoIncrement, { inc_field: "activity_id" });
const Activity = mongoose.model("Activity", activityData);

module.exports = Activity;
