require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
const uri = process.env.MONGO_URI;
const activityRouter = require("./routes/activityRoutes");

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "trailblaze",
});

mongoose.connection.on("connected", () => {
  console.log("Connected to the Database");
});
// Use the cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/activities", activityRouter);

module.exports = app;
