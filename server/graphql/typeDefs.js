const { gql } = require('apollo-server');

module.exports = gql`

type Vehicle {
    carname:String,
    DailyPrice:Int,
    Condition:String,
    Model:String,
    Milege:String,
    transmissiontyp:String,
    fueltyp:String
    carimg:String
    rating:Int
}

input VehicleInput {
    carname:String,
    DailyPrice:Int,
    Condition:String,
    Model:String,
    Milege:String,
    transmissiontyp:String,
    fueltyp:String
    carimg:String
    rating:Int
}

type User {
    
    FullName:String,
    DrivingLicence:String,
    email:String,
    password: String 
}

input UserInput {
    FullName:String,
    DrivingLicence:String,
    email:String,
    password: String 
}

type Query {
    vehicle(ID: ID!): Vehicle!
    getVehicles(amount: Int): [Vehicle]
    user(ID:ID!):User!
    getUsers: [User]
}

type Mutation 
{
    createVehicle(vehicleInput: VehicleInput): Vehicle!
    deleteVehicle(ID:ID!): Boolean
    editVehicle(ID: ID!, vehicleInput: VehicleInput):Boolean
    createUser(UserInput: UserInput):User!
    deleteUser(ID:ID!): Boolean
    editUser(ID: ID!, UserInput: UserInput):Boolean
}

`