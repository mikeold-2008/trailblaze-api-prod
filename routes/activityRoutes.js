const express = require("express");
const activityRouter = express.Router();
const {
  getAllActivities,
  getSingleActivity,
  deleteOneActivity,
  postOneActivity,
  updateOneActivity,
  getActivitiesByUser,
} = require("../controllers/activityController");

activityRouter.get("/", getAllActivities);
activityRouter.get("/:activity_id", getSingleActivity);
activityRouter.delete("/:activity_id", deleteOneActivity);
activityRouter.post("/", postOneActivity);
activityRouter.patch("/:activity_id", updateOneActivity);
activityRouter.get("/user/:user_id", getActivitiesByUser);

module.exports = activityRouter;
