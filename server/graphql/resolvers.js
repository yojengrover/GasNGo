
const Vehicle = require('../models/Vehicle');
const User = require('../models/user');

module.exports = {

    Query:{
        
        async vehicle(_,{ID}) {
            return await Vehicle.findById(ID)
        },
        async getVehicles(_,{amount}) {
            return await Vehicle.find().sort({createdAt: -1}).limit(amount)
        },
        async user(_,{ID}) {
            return await User.findById(ID)
        },
        async getUsers(_,{}) {
            return await User.find()
        }

    },
    Mutation:{
       async createVehicle(_, {vehicleInput: {carname, DailyPrice, Condition, Model, Milege,transmissiontyp,fueltyp,carimg,rating}}){
             const createdVehicle = new Vehicle({
                carname : carname, 
                DailyPrice : DailyPrice,
                Condition : Condition,
                Model : Model,
                Milege: Milege,
                transmissiontyp: transmissiontyp,
                fueltyp: fueltyp,
                carimg:carimg,
                rating:rating
             })

             const res = await createdVehicle.save(); // saving mongodb

             return {
                id:res.id,
                ...res._doc
             }
       }, 

       async deleteVehicle (_, {ID}) {
          const wasdeleted = (await Vehicle.deleteOne({_id: ID})).deletedCount;
          return wasdeleted;
        
       }, 

       async editVehicle(_, {ID, vehicleInput: {carname, DailyPrice, Condition, Model, Milege,transmissiontyp,fueltyp,carimg,rating}}) {
        const wasEdited = (await Vehicle.updateOne({_id: ID}, {carname : carname, 
            DailyPrice : DailyPrice,
            Condition : Condition,
            Model : Model,
            Milege: Milege,
            Milege: Milege,
            transmissiontyp: transmissiontyp,
            fueltyp: fueltyp,
            carimg:carimg,
            rating:rating
        })).modifiedCount;

            return wasEdited;
       },

       async createUser(_, {UserInput: {FullName,DrivingLicence,email,password}}){
        const createUser = new User({
            FullName : FullName, 
            DrivingLicence : DrivingLicence,
            email : email,
            password : password
           
        })

        const res = await createUser.save(); // saving mongodb

        return res;
  }, 

  async deleteUser (_, {ID}) {
     const wasdeleted = (await User.deleteOne({_id: ID})).deletedCount;
     return wasdeleted;
   
  }, 

  async editUser(_, {ID, UserInput: {id,FullName,DrivingLicence,email,password}}) {
   const wasEdited = (await User.updateOne({_id: ID}, {
    
    FullName : FullName, 
    DrivingLicence : DrivingLicence,
    email : email,
    password : password
       
   })).modifiedCount;

       return wasEdited;
  }
             
    }
}