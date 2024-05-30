const Activity = require("../models/activityModel");

const getAllActivities = async (req, res, next) => {
  try {
    const allActivities = await Activity.find();
    if (allActivities.length === 0) {
      res.status(400).json({ message: "No activities found" });
    } else {
      res.status(200).json(allActivities);
    }
  } catch (error) {
    next(error);
  }
};

const getSingleActivity = async (req, res, next) => {
  const { activity_id } = req.params;
  // code: 'ERR_ASSERTION' due to mismatch in scheme and real input
  if (isNaN(activity_id)) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const singleActivity = await Activity.findOne({ activity_id: activity_id });
    // when activity_id is non-existent number, singleActivity is null
    if (!singleActivity) {
      res.status(404).json({ message: "No matching result found" });
    } else {
      res.status(200).json(singleActivity);
    }
  } catch (error) {
    next(error);
  }
};

const postOneActivity = async (req, res, next) => {
  const { exercise_name, user_id, duration, completed_at, distance } = req.body;
  try {
    const newActivity = await Activity.create({
      exercise_name: exercise_name,
      user_id: user_id,
      activity_duration: duration,
      completed_at: completed_at,
      distance: distance,
    });
    if (!newActivity) {
      res.status(500).json({ message: "Request failed" });
    } else {
      res.status(201).json(newActivity);
    }
  } catch (error) {
    next(error);
  }
};

const updateOneActivity = async (req, res, next) => {
  const { completed_at } = req.body;
  const { activity_id } = req.params;
  if (isNaN(activity_id)) {
    res.status(400).send({ message: "Bad request" });
  }
  try {
    const activityFound = await Activity.findOne({ activity_id: activity_id });
    if (!activityFound) {
      res.status(404).send({ message: "No matching result found" });
    } else {
      const updatedActivity = await Activity.updateOne(
        { activity_id: activity_id },
        { completed_at: completed_at }
      );
      if (updatedActivity.acknowledged) {
        res.status(200).json({ message: "Activity updated" });
      } else {
        res.status(400).json({ message: "Bad request" });
      }
    }
  } catch (error) {
    next(error);
  }
};

const deleteOneActivity = async (req, res, next) => {
  const { activity_id } = req.params;
  if (isNaN(activity_id)) {
    res.status(400).send({ message: "Bad request" });
  }
  try {
    const activityFound = await Activity.findOne({
      activity_id: activity_id,
    });
    if (!activityFound) {
      res.status(404).json({
        message: "No matching activity found",
      });
    } else {
      const activityToDelete = await Activity.deleteOne({
        activity_id: activity_id,
      });
      if (activityToDelete.acknowledged) {
        res.status(200).json({ message: "activity successfully deleted" });
      } else {
        res
          .status(500)
          .json({ message: "An error occurred while deleting the activity" });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getActivitiesByUser = async (req, res, next) => {
  const { user_id } = req.params;
  if (isNaN(user_id)) {
    return res.status(400).json({ message: "Bad request" });
  }
  try {
    const activitiesByUser = await Activity.find({ user_id: user_id });
    if (activitiesByUser.length === 0) {
      res.status(404).json({ message: "No matching activities found" });
    } else {
      res.status(200).send(activitiesByUser);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllActivities,
  getSingleActivity,
  deleteOneActivity,
  postOneActivity,
  updateOneActivity,
  getActivitiesByUser,
};
