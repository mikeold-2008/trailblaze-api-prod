const User = require("../models/userModel")


// Get a specific user by ID
exports.getUser = async (req, res) => {

    const userId = req.params.id;
    try {
      const user = await User.findOne({id: userId});
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
          }
          res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    }
   };