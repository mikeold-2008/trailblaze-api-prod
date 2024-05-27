require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
const { MONGO_URI, DB_NAME, NODE_ENV } = process.env;
const activityRouter = require("./routes/activityRoutes");


const soloChallengeRoutes = require("./routes/soloChallengeRoutes")
const twoPersonChallengeRoutes = require("./routes/twoPersonChallengeRoutes")

// Connect to MongoDB
if (!NODE_ENV === test) {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_NAME,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to the Database");
  });
}

// Use the cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/activities", activityRouter);
app.use('/challenges/solo',soloChallengeRoutes)
app.use('/challenges/dual',twoPersonChallengeRoutes)

app.use((err, req, res, next) => {
  res.status(500).json({ message: err._message });
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});

module.exports = app;
