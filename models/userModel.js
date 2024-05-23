const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const userData = new mongoose.Schema({
 id: Number,
 email: String,
 password: String,
 firstName: String,
 lastName: String
});

userData.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userData);



module.exports = User;