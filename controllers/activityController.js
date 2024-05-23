const Activity = require("../models/activityModel");

const getAllActivities = async (req, res) => {
  try {
    const allActivities = await Activity.find();
    if (allActivities.length === 0) {
      res.status(400).json({ message: "No activities found" });
    } else {
      res.status(200).json(allActivities);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching all activities" });
  }
};

const getSingleActivity = async (req, res, next) => {
  const { activity_id } = req.params;
  try {
    const singleActivity = await Activity.findOne({ activity_id: activity_id });
    if (!singleActivity) {
      res.status(404).json({ message: "No matching activity found" });
    } else {
      res.status(200).json(singleActivity);
    }
  } catch (error) {
    // code: 'ERR_ASSERTION',
    // console.error(error);
    next(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the activity" });
  }
};

const postOneActivity = async (req, res) => {
  const activityToAdd = req.body;
};

const deleteOneActivity = async (req, res) => {
  const { activity_id } = req.params;
  try {
    const doesActivityExist = await Activity.findOne({
      activity_id: activity_id,
    });
    if (!doesActivityExist) {
      res.send(404).json({
        message: "Activity not found",
      });
    } else {
      const activityToDelete = await Activity.deleteOne({
        activity_id: activity_id,
      });
      if (activityToDelete.acknowledged) {
        res.send(200).json({ message: "user deleted" });
      } else {
        res
          .status(500)
          .json({ message: "An error occurred while deleting the activity" });
      }
    }
  } catch (error) {
    res
      .status(501)
      .json({ message: "An error occurred while deleting the activity" });
  }
};

module.exports = { getAllActivities, getSingleActivity, deleteOneActivity };
