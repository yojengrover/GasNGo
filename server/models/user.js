const {model, Schema } = require('mongoose');

const userSchema = new Schema({
    
    FullName:String,
    DrivingLicence:String,
    email:String,
    password: String 
});

module.exports =  model("User", userSchema);