const express = require("express");
const activityRouter = express.Router();
const {
  getAllActivities,
  getSingleActivity,
  deleteOneActivity,
} = require("../controllers/activityController");

activityRouter.get("/", getAllActivities);
activityRouter.get("/:activity_id", getSingleActivity);
activityRouter.delete("/:activity_id", deleteOneActivity);
// activityRouter.post("/", postOneActivity);
// activityRouter.patch("/", update...);

module.exports = activityRouter;
