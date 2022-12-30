import {gql} from "@apollo/client" 

export const CREATE_USER_MUTATION = gql
`
mutation createUser(
    $FullName: String!
    $DrivingLicence: String!
    $email: String!
    $password: String)
{

    createUser( UserInput:{
        FullName: $FullName
        DrivingLicence: $DrivingLicence
        email: $email
        password: $password


    }){
        FullName
        password       
    }

}


`;