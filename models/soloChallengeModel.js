const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const soloChallenge = new mongoose.Schema({
    challenge_id: Number,
    exercise_name: String,
    user_id: Number,
    duration: String,
    distance: String,
    pass: Boolean
})

soloChallenge.plugin(AutoIncrement, { inc_field: 'challenge_id'});



const SoloChallenge = mongoose.model('solochallenge', soloChallenge);


module.exports=SoloChallenge


