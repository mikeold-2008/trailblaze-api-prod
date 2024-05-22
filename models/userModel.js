const mongoose = require("mongoose");
const userData = new mongoose.Schema({
 id: Number,
 username: String,
 email: String,
 password: String,
 firstName: String,
 lastName: String
});

const User = mongoose.model('User', userData);

module.exports = User;