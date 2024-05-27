const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require ('bcrypt')

const userData = new mongoose.Schema({
 id: Number,
 email: {
    type: String,
    required: true
},
 password: {
    type: String,
    required: true
},
 firstName: String,
 lastName: String,
 friends: Array
});

//hash user pw before save/create 
userData.pre('save',function(next){
    if(this.isModified('password')){
        return next()
    }
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err){
            return next(err)
        }
        this.password = passwordHash
        next()
    })
})



userData.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.model('User', userData);



module.exports = User;