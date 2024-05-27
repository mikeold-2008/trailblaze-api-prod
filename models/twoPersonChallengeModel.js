const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);


const twoPersonChallenge = new mongoose.Schema({
    dual_challenge_id: Number,
    challenge_proposer_id: Number,
    challenge_proposer_name: String,
    challenge_accepter_id: Number,
    challenge_accepter_name: String,
    exercise_name: String,
    duration: Number,
    target: Number, 
    challenge_winner: Number,
    start_date: Date,
    challenge_accepted: Boolean
}) 

twoPersonChallenge.plugin(AutoIncrement, { inc_field: 'dual_challenge_id'});


const TwoPersonChallenge = mongoose.model('twopersonchallenge', twoPersonChallenge);


module.exports=TwoPersonChallenge