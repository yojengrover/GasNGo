const {model, Schema } = require('mongoose');

const VehicleSchema = new Schema({
    
    carname:String,
    DailyPrice:Number,
    Condition:String,
    Model:String,
    Milege:String,
    transmissiontyp:String,
    fueltyp:String,
    carimg:String,
    rating:Number
    
});

module.exports = model('Vehicle', VehicleSchema);
// comment